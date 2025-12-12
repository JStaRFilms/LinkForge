# LinkForge - Coding Rules

## 1. The VibeCode Protocol (Non-Negotiable)
- **Blueprint Rule:** never write complex code without a plan. Update `docs/features/` first.
- **200-Line Rule:** files approaching 200 lines *must* be refactored.
- **Documentation:** "Documentation is Code". Keep `docs/` in sync.

## 2. Tech Stack Standards (Next.js 15)
- **Server First:** default to RSC. Use `'use client'` only when necessary.
- **Service Pattern:** business logic in `*.service.ts`, not API routes.
- **Validation:** strict Zod validation for all inputs.
- **Styling:** Tailwind CSS v4 only. No `.css` files unless for complex animations.

## 3. General Best Practices
- **Strict TypeScript:** no `any`. Explicit return types for functions.
- **Security:** never log sensitive data. Sanitize inputs.
- **Naming:** use `kebab-case` for files, `PascalCase` for components.
