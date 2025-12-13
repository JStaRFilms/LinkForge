# User & Multi-Profile System

## Overview

LinkForge uses a **cookie-based user identification** system (no email/password auth in v1). Each user can create multiple profiles (bio pages).

## Models

### User
- **id**: UUID (set by middleware cookie or auto-generated)
- **email**: Optional (reserved for future auth integration)
- **profiles**: One-to-many relation with Profile

### Profile
- **userId**: Foreign key to User
- **isPrimary**: Boolean flag indicating the "main" profile

## isPrimary Business Rules

> **Constraint**: Each User should have exactly **one** Profile where `isPrimary=true`.

### Enforcement (Application Layer)

SQLite doesn't support partial unique indexes, so we enforce this in code:

1. **First Profile Created** → Automatically set `isPrimary=true`
   - See: `ProfileService.createProfile()` in `src/features/profile/services/profile.service.ts`

2. **Subsequent Profiles** → Default to `isPrimary=false`

3. **Fallback Logic** → If no `isPrimary=true` profile exists, `getCurrentProfile()` falls back to the first profile by `createdAt`.
   - See: `src/lib/auth.ts`

### Future: Database Enforcement

When migrating to PostgreSQL, add a partial unique index:

```sql
CREATE UNIQUE INDEX unique_primary_profile 
ON "Profile" ("userId") 
WHERE "isPrimary" = true;
```

## Cookie Strategy

| Cookie | Purpose | Set By |
|--------|---------|--------|
| `linkforge_user_id` | Identifies the user | Middleware |
| `linkforge_active_profile` | Currently selected profile | Server Actions |

Both cookies are:
- `httpOnly: true`
- `secure: true`
- `sameSite: "lax"`
- `maxAge: 1 year`

## Files

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Sets initial user cookie |
| `src/lib/auth.ts` | `getCurrentUser()`, `getCurrentProfile()` |
| `src/features/user/services/user.service.ts` | User CRUD |
| `src/features/profile/services/profile.service.ts` | Profile CRUD |
| `src/features/profile/actions.ts` | `createProfileAction`, `switchProfileAction` |
