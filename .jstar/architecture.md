# LinkForge - Architecture Overview

## What is LinkForge?
A premium, self-hosted "link-in-bio" tool (Linktree alternative) without subscription fees.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **Database:** Prisma ORM + SQLite
- **UI Libraries:** Lucide React (icons), dnd-kit (drag-and-drop)

## Folder Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (dashboard)/          # Dashboard route group (authenticated views)
│   ├── [username]/           # Dynamic public profile route
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home/landing page
│   └── globals.css           # Global styles & Tailwind directives
│
├── features/                 # Feature-Sliced Design
│   ├── links/                # Link management (CRUD, reordering)
│   └── profile/              # User profile management
│
└── lib/                      # Shared utilities & services
```

## Data Models (Prisma)

### Profile
- `id` (cuid) - Primary Key
- `username` (unique) - Public URL handle
- `name`, `bio`, `avatar` - Display info
- `theme` - Light/Dark/Custom
- `links[]` - Relation to Link

### Link
- `id` (cuid) - Primary Key
- `title`, `url` - Link content
- `icon` - Emoji or icon identifier
- `order` - For drag-and-drop sorting
- `clicks` - Analytics counter
- `isEnabled` - Toggle visibility
- `profileId` - Foreign Key to Profile

## Key Patterns
1. **RSC by Default:** Server Components for data fetching; Client Components only for interactivity.
2. **Service Layer:** Business logic in `*.service.ts` files, not in route handlers or components.
3. **Zod Validation:** All inputs validated before processing.
