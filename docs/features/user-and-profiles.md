# User & Multi-Profile System

## Overview

LinkForge uses a **cookie-based user identification** system with **HMAC-signed cookies** for security (no email/password auth in v1). Each user can create multiple profiles (bio pages).

## Security

### Signed Cookies

User ID cookies are signed with HMAC-SHA256 to prevent forgery:

```
Cookie Value Format: {userId}.{signature}
Signature = HMAC-SHA256(userId, COOKIE_SECRET)
```

**Implementation**:
- `src/lib/cookie-utils.ts` - Signing/verification utilities
- `src/middleware.ts` - Sets signed cookies on first visit
- `src/lib/auth.ts` - Verifies signature before trusting user ID

**Environment Variable**:
```env
COOKIE_SECRET=your-secure-random-string
```

> [!IMPORTANT]
> If a cookie signature verification fails, the user gets a new session with a fresh ID.

### Email Field Strategy

The `email` field on User is **intentionally optional** in v1:
- No email auth, so email isn't required for core functionality
- Reserved for future auth integration (next-auth, clerk, etc.)
- When email auth is implemented, add `@unique` constraint

---

## Models

### User
- **id**: UUID (set by middleware cookie or auto-generated)
- **email**: Optional (reserved for future auth integration)
- **profiles**: One-to-many relation with Profile

### Profile
- **userId**: Foreign key to User
- **isPrimary**: Boolean flag indicating the "main" profile

---

## isPrimary Business Rules

> **Constraint**: Each User should have exactly **one** Profile where `isPrimary=true`.

### Enforcement (Application Layer)

SQLite doesn't support partial unique indexes, so we enforce this in code:

1. **First Profile Created** → Automatically set `isPrimary=true`
   - See: `ProfileService.createProfile()` in `src/features/profile/services/profile.service.ts`

2. **Subsequent Profiles** → Default to `isPrimary=false`

3. **Fallback Logic** → If no `isPrimary=true` profile exists, `getCurrentProfile()` falls back to the first profile by `createdAt`.
   - See: `src/lib/auth.ts`

### Race Condition Mitigation

While SQLite lacks partial unique indexes, the application layer handles this safely:

- Profile creation uses Prisma transactions where applicable
- `isPrimary` is only set `true` during **first profile creation** (atomic operation)
- Subsequent profiles always get `isPrimary=false` by default
- Fallback logic ensures a profile is always selected even if `isPrimary` is inconsistent

### Future: Database Enforcement

When migrating to PostgreSQL, add a partial unique index:

```sql
CREATE UNIQUE INDEX unique_primary_profile 
ON "Profile" ("userId") 
WHERE "isPrimary" = true;
```

---

## Cookie Strategy

| Cookie | Purpose | Set By |
|--------|---------|--------|
| `linkforge_user_id` | Identifies the user (signed) | Middleware |
| `linkforge_active_profile` | Currently selected profile | Server Actions |

Both cookies are:
- `httpOnly: true`
- `secure: true` (production only)
- `sameSite: "lax"`
- `maxAge: 1 year`

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/cookie-utils.ts` | HMAC signing/verification |
| `src/middleware.ts` | Sets initial signed user cookie |
| `src/lib/auth.ts` | `getCurrentUser()`, `getCurrentProfile()` |
| `src/features/user/services/user.service.ts` | User CRUD with Zod validation |
| `src/features/profile/services/profile.service.ts` | Profile CRUD |
| `src/features/profile/actions.ts` | `createProfileAction`, `switchProfileAction` |

