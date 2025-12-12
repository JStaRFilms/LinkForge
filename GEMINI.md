# LinkForge - Project Context

## Overview
**LinkForge** is a premium, self-hosted link-in-bio tool designed to be a "Linktree killer" without the monthly fees.

## Tech Stack
- **Next.js 15 (App Router)**
- **Tailwind CSS v4**
- **Prisma + SQLite**
- **Zod**

## Key Rules (The VibeCode Protocol)

1.  **Server Components Default:** Use RSC unless interactivity is required.
2.  **Service Pattern:** Abstract logic into `*.service.ts` files. Keep API routes thin.
3.  **Feature-Sliced:** Organize code by feature (`src/features/[name]`).
4.  **Premium UI:** Design must be mobile-first, fast, and aesthetically pleasing.
5.  **Documentation:** Update docs if code changes.

## Current State
- **Phase:** Build / Execution
- **Goal:** Reaching Minimum Usable State (MUS).

## MUS Features
1.  **Link Dashboard (FR-001):** CRUD for links.
2.  **Public Profile (FR-002):** `/[username]` page.
3.  **Theme System (FR-003):** Light/Dark/Custom.
4.  **Analytics (FR-004):** Track link clicks.
