# Blueprint: Custom Domains (FR-005)

## Goal
Allow users to connect a custom domain (e.g., `www.johndoe.com`) to their LinkForge profile, replacing the default `link.jstarstudios.com/[username]` URL.

## User Review Required
> [!IMPORTANT]
> **Middleware & Database Limitation:**
> Since we use SQLite (file-based), we cannot query the database in Next.js Middleware (Edge Runtime).
> **Solution:** The middleware will blindly rewrite ALL custom domain traffic to `/_domain/[hostname]`. The specific page handler will then query the database to find the associated profile.
> 
> **Architecture Impact:**
> - New internal route: `src/app/_domain/[domain]/page.tsx`
> - New Feature Slice: `src/features/domains/`

## Proposed Changes

### Database Schema (Prisma)
Add a `Domain` model to manage one-to-many domains per profile (though usually 1:1, this allows flexibility).

```prisma
// prisma/schema.prisma

model Profile {
  // ... existing fields
  domains Domain[]
}

model Domain {
  id        String   @id @default(cuid())
  domain    String   @unique // e.g. "links.example.com"
  
  // Verification (simplified for v1)
  verified  Boolean  @default(false) 
  
  profile   Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)
  profileId String
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([profileId])
}
```

### Component Breakdown

#### `[Server]` src/app/_domain/[domain]/page.tsx
- **Role:** The entry point for custom domain traffic.
- **Logic:**
  1. Receives `domain` param.
  2. calls `DomainsService.getByDomain(domain)`.
  3. If found: Renders the public profile (reusing Profile components).
  4. If not found: Renders 404 / "Domain not connected" page.

#### `[Server]` src/middleware.ts
- **Logic:**
  1. Detects `hostname` from request headers.
  2. Checks if `hostname` is NOT the app domain (e.g. `localhost:3000` or `link.jstarstudios.com`).
  3. Rewrites request to `/_domain/${hostname}${path}`.

#### `[Server]` src/features/domains/services/domains.service.ts
- `create(profileId, domain)`
- `delete(profileId, domainId)`
- `getByDomain(domain)` -> returns Profile with Links
- `list(profileId)`

#### `[Client]` src/features/domains/components/DomainSettings.tsx
- UI for adding/removing domains in the Dashboard.
- Shows CNAME instructions (Point to `link.jstarstudios.com`).

### Implementation Plan

1.  **Phase 1: Database & Service**
    - [ ] Update `prisma/schema.prisma`
    - [ ] Run `npx prisma db push` (dev mode)
    - [ ] Create `src/features/domains/services/domains.service.ts`
    - [ ] Create Zod schemas in `src/features/domains/schemas.ts`

2.  **Phase 2: Middleware & Routing**
    - [ ] Update `src/middleware.ts` to handle domain rewriting.
    - [ ] Create `src/app/_domain/[domain]/page.tsx`.
    - [ ] Refactor `src/app/[username]/page.tsx` code into reusable `src/features/profile/components/PublicProfile.tsx` to share between both routes.

3.  **Phase 3: Dashboard UI**
    - [ ] Create `src/features/domains/components/DomainSettings.tsx`.
    - [ ] Add "Domains" tab/section to User Dashboard.
    - [ ] Implement Server Action for adding domains.

## Verification Plan

### Automated Tests
- Unit test `DomainsService`: Create, find, delete.
- *Note:* Middleware testing is difficult in unit tests; will rely on manual verification.

### Manual Verification
1.  **Localhost Simulation:**
    - Edit `hosts` file (Windows): `127.0.0.1  mysite.local`
    - Start app on port 3000.
    - Visit `http://mysite.local:3000`.
    - Verify middleware rewrites to `/_domain/mysite.local`.
    - Verify profile loads if domain is added to DB.
