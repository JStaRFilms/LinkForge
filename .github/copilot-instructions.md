# LinkForge - Copilot Instructions

You are assisting with **LinkForge**, an open-source, self-hosted link-in-bio tool.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 (Utility-first, no custom CSS)
- **Database:** Prisma + SQLite
- **Validation:** Zod
- **Language:** TypeScript

## Coding Guidelines

### 1. Server Components First
- Default to React Server Components (RSC).
- ONLY use `'use client'` if you need hooks (`useState`, `useEffect`) or event handlers (`onClick`).
- Fetch data in Server Components and pass it down.

### 2. Feature-Sliced Design
- `src/app`: Routes only.
- `src/features/[feature]`: Business logic, components, hooks, services.
- `src/components/ui`: Dumb, reusable UI components.

### 3. Service Pattern
- Business logic goes in `src/features/[feature]/services/[feature].service.ts`.
- Route handlers (`src/app/api/...`) should only parse requests, validate with Zod, and call the service.

### 4. Code Quality
- **The 200-Line Rule:** If a file exceeds 200 lines, refactor.
- **Zod Validation:** Validate ALL API inputs.
- **Premium Aesthetics:** Use Tailwind for vibrant, polished UI.

## Project Structure
```
src/
├── app/                    # Pages & API Routes
├── features/               # Feature modules (links, profile, analytics)
├── components/ui/          # Shared UI components
├── lib/                    # Utilities (prisma, utils)
└── styles/                 # Global styles
```
