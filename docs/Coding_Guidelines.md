# LinkForge — Coding Guidelines

## The Blueprint and Build Protocol (Mandatory)

> [!IMPORTANT]
> This protocol governs the entire lifecycle of creating any non-trivial feature.

### Phase 1: The Blueprint (Planning & Documentation)

Before writing ANY code for a new feature, a plan **MUST** be created in `docs/features/[FeatureName].md`.

**The Blueprint Must Include:**

1. **High-Level Goal** — What problem does this solve?
2. **Component Breakdown** — List all components, labeled as `[Server]` or `[Client]`
3. **Logic & Data Breakdown** — Hooks, API routes, services
4. **Database Schema Changes** — Prisma model additions/modifications
5. **Step-by-Step Implementation Plan** — Ordered list of tasks

**This plan requires human approval before proceeding to Phase 2.**

### Phase 2: The Build (Iterative Implementation)

Execute the plan **one step at a time**:
1. Present code changes
2. Update the feature documentation
3. Wait for "proceed" signal before continuing

### Phase 3: Finalization

1. Announce completion
2. Present final documentation
3. Provide integration/testing instructions

---

## Tech Stack Rules (Next.js 15 + App Router)

### 1. Server Components First

```typescript
// ✅ Default: Server Component (no directive needed)
async function ProfilePage({ params }) {
  const profile = await getProfile(params.username);
  return <Profile data={profile} />;
}

// ❌ Avoid: Client Component for data fetching
'use client'
function ProfilePage() {
  const [data, setData] = useState(null);
  useEffect(() => { /* fetch */ }, []); // BAD
}
```

**Rule:** All components are React Server Components (RSC) by default. Only add `'use client'` when you need:
- Event handlers (`onClick`, `onChange`)
- React hooks (`useState`, `useEffect`)
- Browser APIs (`window`, `localStorage`)

### 2. Feature-Sliced Design

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Dashboard route group
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── [username]/         # Dynamic public profile
│   │   └── page.tsx
│   └── api/                # Route handlers
│       └── links/
│           └── route.ts
├── features/               # Domain-specific modules
│   ├── links/
│   │   ├── components/     # LinkCard.tsx, LinkForm.tsx
│   │   ├── hooks/          # useLinks.ts
│   │   ├── services/       # links.service.ts
│   │   └── types.ts
│   ├── profile/
│   └── analytics/
├── components/             # Shared, dumb UI components
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/                    # Utilities and configurations
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts
└── styles/
    └── globals.css         # Tailwind directives
```

### 3. Service Pattern (Backend Logic)

```typescript
// src/features/links/services/links.service.ts
import { prisma } from '@/lib/prisma';

export const LinksService = {
  async getAll(userId: string) {
    return prisma.link.findMany({ where: { userId }, orderBy: { order: 'asc' } });
  },
  
  async create(data: CreateLinkInput) {
    return prisma.link.create({ data });
  },
  
  async trackClick(linkId: string) {
    return prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } }
    });
  }
};
```

**Route Handlers are dumb controllers:**

```typescript
// src/app/api/links/route.ts
import { NextResponse } from 'next/server';
import { LinksService } from '@/features/links/services/links.service';
import { createLinkSchema } from '@/features/links/schemas';

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createLinkSchema.safeParse(body);
  
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  
  const link = await LinksService.create(parsed.data);
  return NextResponse.json(link, { status: 201 });
}
```

### 4. Validation with Zod

```typescript
// src/features/links/schemas.ts
import { z } from 'zod';

export const createLinkSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.string().url(),
  order: z.number().int().optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
```

### 5. Styling: Tailwind CSS Only

```typescript
// ✅ Tailwind utilities
<button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform">
  Click Me
</button>

// ❌ No inline styles or CSS modules
<button style={{ backgroundColor: 'purple' }}>Click Me</button>
```

### 6. The 200-Line Rule

> [!WARNING]
> If a file approaches **200 lines**, STOP and refactor.

- Extract hooks → `features/[name]/hooks/`
- Extract UI → `features/[name]/components/`
- Extract logic → `features/[name]/services/`

### 7. Database: Prisma + SQLite

```prisma
// prisma/schema.prisma
model Profile {
  id        String   @id @default(cuid())
  username  String   @unique
  name      String?
  bio       String?
  theme     String   @default("dark")
  links     Link[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Link {
  id        String   @id @default(cuid())
  title     String
  url       String
  order     Int
  clicks    Int      @default(0)
  profile   Profile  @relation(fields: [profileId], references: [id])
  profileId String
  createdAt DateTime @default(now())
}
```

---

## Naming Conventions

| Type | Convention | Example |
| :--- | :--- | :--- |
| Components | PascalCase | `LinkCard.tsx` |
| Hooks | camelCase, `use` prefix | `useLinks.ts` |
| Services | PascalCase + `.service.ts` | `links.service.ts` |
| API Routes | `route.ts` in folder | `api/links/route.ts` |
| Types | PascalCase | `CreateLinkInput` |
| Folders | kebab-case or camelCase | `link-card/` or `linkCard/` |

---

## Git Workflow

1. **Branch Naming:** `feature/FR-XXX-short-description`
2. **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)
3. **PRs:** Reference the FR ID in the PR title

---

## Performance Targets

- **LCP:** < 2.0s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Bundle Size:** Keep JS < 200KB (first load)

---

## Documentation is Code

> [!TIP]
> If you change the code, you **MUST** update the docs.

Every feature must have:
1. `docs/features/[FeatureName].md` — The Blueprint
2. Inline JSDoc for complex functions
3. Updated `Project_Requirements.md` status if completing an FR
