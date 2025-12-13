# Feature: Authentication

Centralized auth abstraction for LinkForge (`src/lib/auth.ts`).

---

## Overview

This module provides a single point of abstraction for authentication. Currently uses a **placeholder implementation** with a seeded profile for development.

> [!IMPORTANT]
> **For real auth:** Replace `getCurrentProfile()` internals with your auth provider (next-auth, clerk, supabase-auth). All dependent files (~7+) will continue working.

---

## API Reference

### `getCurrentProfile(): Promise<AuthProfile>`
Returns the current authenticated user's profile.

**Returns:**
```typescript
interface AuthProfile {
    id: string;
    username: string;
    name: string | null;
    theme: string;
}
```

**Throws:** Error if profile not found or not authenticated.

---

### `requireProfileId(): Promise<string>`
Convenience wrapper that returns just the profile ID.

**Usage:** Server Actions that only need the ID for queries.

---

## Current Implementation

```typescript
// Placeholder: Returns seeded "johndoe" profile
const profile = await prisma.profile.findFirst({
    where: { username: "johndoe" },
});
```

---

## Migration Path

1. Install auth provider (e.g., `next-auth`)
2. Configure provider in `auth.ts`
3. Replace `getCurrentProfile()` body:
   ```typescript
   const session = await auth();
   if (!session?.user) throw new Error("Not authenticated");
   return prisma.profile.findUniqueOrThrow({ 
       where: { userId: session.user.id } 
   });
   ```
4. All 7+ dependent files will continue working

---

## Dependents

Files using this module:
- `src/features/links/actions.ts`
- `src/features/themes/actions.ts`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/dashboard/themes/page.tsx`
- `src/app/(dashboard)/dashboard/analytics/page.tsx`
