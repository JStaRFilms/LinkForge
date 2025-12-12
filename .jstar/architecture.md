# LinkForge - Architecture Overview

## Project Summary
**LinkForge** is a self-hosted link-in-bio tool (Linktree alternative).
- **Goal:** MUS (Minimum Usable State)
- **User:** "Pro Dev" (values speed, autonomy)

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** Prisma ORM with SQLite
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript

## Directory Structure
- `src/app`: App Router pages and API routes.
- `src/features`: Feature-Sliced Design (e.g., `src/features/links/`).
  - Contains: components, hooks, services, types.
- `src/components/ui`: Shared "dumb" UI components (buttons, cards).
- `src/lib`: Utilities and shared configurations.
- `docs/features`: Feature blueprints and specs.

## Key Patterns
- **Service Pattern:** Logic lives in `services/`.
- **Feature Sliced:** Code is organized by domain, not type.
