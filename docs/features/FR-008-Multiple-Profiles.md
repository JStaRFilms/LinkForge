# FR-008: Multiple Profiles

## High-Level Goal

Enable users to create and manage multiple link-in-bio pages (e.g., Personal, Business) from a single dashboard using cookie-based session management.

## Component Breakdown

| Component | Type | Description |
|-----------|------|-------------|
| `User` model | [Server] | New Prisma model to group profiles |
| `UserService` | [Server] | `ensureUser()` - Cookie-based user management |
| `ProfileService` | [Server] | Extended with `createProfile`, `getProfilesByUserId` |
| `ProfileSwitcher` | [Client] | Sidebar dropdown to switch/create profiles |
| `Sidebar` | [Client] | Updated to receive profiles and active context |
| `middleware.ts` | [Server] | Sets `linkforge_user_id` cookie on first visit |
| Server Actions | [Server] | `createProfileAction`, `switchProfileAction` |

## Database Schema Changes

```prisma
model User {
  id        String    @id @default(cuid())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  profiles  Profile[]
}

model Profile {
  // ... existing fields ...
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  isPrimary Boolean  @default(false)
}
```

## Implementation Summary

### Files Created
- `src/features/user/services/user.service.ts` - User creation/retrieval
- `src/features/profile/components/profile-switcher.tsx` - UI for switching
- `src/middleware.ts` - Cookie initialization

### Files Modified
- `prisma/schema.prisma` - Added User model, updated Profile
- `src/lib/auth.ts` - Cookie-based auth with `getCurrentUser`, `getCurrentProfile`
- `src/features/profile/services/profile.service.ts` - Multi-profile queries
- `src/features/profile/actions.ts` - Create/switch profile actions
- `src/components/ui/sidebar.tsx` - Integrated ProfileSwitcher
- `src/app/(dashboard)/layout.tsx` - Fetches profiles for sidebar
- Dashboard pages - Handle null profile state

## Verification

- ✅ Create new profile from sidebar
- ✅ Switch between profiles
- ✅ Dashboard shows correct links per profile
- ✅ Public profiles accessible at `/{username}`

## Known Limitations

- **Cookie-based session**: Clearing cookies loses profile access (no email/password auth yet)
- **No profile deletion**: Users cannot delete profiles (future enhancement)
