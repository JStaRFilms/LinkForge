# LinkForge - Project Context

## Overview
**LinkForge** is a premium, self-hosted link-in-bio tool designed to be a "Linktree killer" without the monthly fees.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Prisma + SQLite
- **Validation**: Zod
- **Language**: TypeScript

## Folder Structure
- `src/app`: App Router pages and API routes
- `src/features`: Domain-specific modules (Feature-Sliced Design)
- `src/components`: Shared UI components
- `src/lib`: Utilities and Singletons (Prisma)
- `docs`: Documentation and Implementation Plans

## Key Principles
- **Server First**: Use React Server Components by default.
- **Service Pattern**: Business logic separates from API routes.
- **Feature-Sliced**: Organize code by domain.
