# Project Coding Rules (VibeCode Protocol)

## 1. The Blueprint Rule
- **Measure Twice, Cut Once:** Never write complex code without a plan.
- **Documentation:** Every major feature must have a corresponding Markdown file in `docs/`.
- **Sync:** If you change the code, you **must** update the docs.

## 2. Architecture & Patterns
- **Next.js App Router:** Server Components (RSC) by default. Use `'use client'` sparingly.
- **Service Pattern:** Abstract business logic into `*.service.ts` files. API routes should be thin controllers.
- **Feature-Sliced Design:** Organize by feature (`src/features/[FeatureName]/`) containing components, hooks, services, and types.
- **UI Components:** Dumb, reusable UI goes in `src/components/ui/`.

## 3. Code Quality
- **200-Line Rule:** If a file approaches 200 lines, refactor it.
- **Type Safety:** TypeScript strict mode. No `any`. Explicit return types for functions.
- **Validation:** All inputs (API, forms) must be validated with **Zod**.

## 4. Styling (Tailwind CSS v4)
- **Utility-First:** Use Tailwind utilities. Avoid `.css` files unless absolutely necessary.
- **Design:** Mobile-first, responsive, premium aesthetics.

## 5. Security
- **Data:** Never log sensitive data.
- **Secrets:** Use environment variables.
