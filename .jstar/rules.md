# LinkForge - Coding Rules

## General (VibeCode Protocol)

- Use **TypeScript strict mode** (`"strict": true` in tsconfig).
- **No `any` types.** Ever. Use `unknown` and type guards if needed.
- All functions must have explicit return types.
- Maximum **200 lines per file.** Propose refactors when approaching this limit.

## Architecture

- **Server Components by Default:** All React components are RSC unless interactivity (`onClick`, `useState`, browser APIs) is required.
- **'use client' Sparingly:** Only add to true Client Components.
- **Service Pattern:** 
    - `*.service.ts` files contain all business logic and database calls.
    - API Route Handlers (`app/api/...`) are thin controllers—parse requests, call services, return responses.
- **Feature-Sliced Design:** Feature code lives in `src/features/[FeatureName]/`.

## Validation

- **All inputs must be validated with Zod.** This includes API route bodies, form data, and URL parameters.
- Define Zod schemas in `*.schema.ts` files co-located with the feature.

## Styling

- **Tailwind CSS only.** No raw CSS files unless strictly necessary for complex animations.
- Design must be mobile-first and premium.

## Security

- Never log sensitive data (API keys, passwords, tokens).
- Validate and sanitize all user-provided content before rendering.

## Testing & Code Quality

- Before merging, ensure `npm run build` and `npm run lint` pass.
- Fix lint errors before committing.
