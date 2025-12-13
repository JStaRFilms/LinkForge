# Feature Blueprint: Link Dashboard (FR-001)

## 1. Goal
Create a comprehensive dashboard for users to manage their links. This is the core functionality of LinkForge.
Key features:
- View all links
- Add new links (Modal)
- Edit existing links
- Delete links
- Reorder links via Drag-and-Drop
- Toggle link visibility

## 2. Architecture & Components

### Database Schema (Prisma)
We need a `Link` model and a `Profile` model (simplifying auth for v1 to single user or simple "me" user).

```prisma
model Profile {
  id        String   @id @default(cuid())
  username  String   @unique
  name      String?
  bio       String?
  avatar    String?
  theme     String   @default("dark")
  links     Link[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Link {
  id        String   @id @default(cuid())
  title     String
  url       String
  icon      String   @default("🚀") // Emoji or icon identifier
  order     Int      @default(0)
  clicks    Int      @default(0)
  isEnabled Boolean  @default(true)
  profile   Profile  @relation(fields: [profileId], references: [id])
  profileId String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Components (Feature-Sliced)

**Path:** `src/features/links/`

- **Components:**
  - `DashboardLayout` (Shell with Sidebar)
  - `LinkList` (Client: `dnd-kit` Context)
  - `LinkItem` (Client: Sortable item)
  - `AddLinkModal` (Client: Dialog)
  - `EditLinkDrawer` (Client: Sheet/Drawer or Modal)
  - `StatsOverview` (Server: Stats Display)

- **Services (`src/features/links/services/links.service.ts`):**
  - `getLinks(profileId)`
  - `createLink(data)`
  - `updateLink(id, data)`
  - `reorderLinks(items: {id, order}[])`
  - `deleteLink(id)`
  - `toggleLink(id)`

- **Hooks:**
  - `useLinks` (Optimistic updates for reordering)

### APIs (Server Actions preferred over API routes for robust mutations)
Technically we are using App Router, so Server Actions are the "VibeCode" way, but the guidelines mentioned API routes for services. We will stick to **Server Actions** for mutation efficiency and type safety with Zod, unless API routes are strictly required for external consumption (not needed yet).
*Correction based on Guideline 3:* Guidelines mention `app/api/links/route.ts`. We will implement API routes to strictly follow the provided guide, but might use Server Actions for the UI forms if permitted. Let's stick to **Server Actions** for form handling (Next.js 15 standard) but keep Service pattern underlying both.

### Server Actions Reference

All actions are in [actions.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/links/actions.ts).

#### `createLinkAction(formData: FormData)`
Creates a new link for the current user.

**FormData fields:**
- `title` (string, required) - Link display title
- `url` (string, required) - Full URL including protocol
- `icon` (string, optional) - Emoji or icon identifier

**Returns:** `{ success: true }` or `{ error: ZodFlattenedError }`

---

#### `updateLinkAction(formData: FormData)`
Updates an existing link.

**FormData fields:**
- `id` (string, required) - Link ID to update
- `title` (string, required) - New title
- `url` (string, required) - New URL
- `icon` (string, optional) - New icon

**Returns:** `{ success: true }` or `{ error: ZodFlattenedError }`

**Example usage:**
```typescript
const formData = new FormData();
formData.set("id", linkId);
formData.set("title", "Updated Title");
formData.set("url", "https://example.com");
await updateLinkAction(formData);
```

**Security:** Ownership is validated via `profileId` in the service layer.

---

#### `deleteLinkAction(id: string)`
Deletes a link by ID.

---

#### `toggleLinkAction(id: string)`
Toggles the `isEnabled` state of a link.

---

#### `reorderLinksAction(items: { id: string; order: number }[])`
Reorders links by updating their `order` field in a transaction.

## 3. Implementation Plan

1.  **Dependencies**: Install `dnd-kit`, `clsx`, `tailwind-merge` (standard utils).
2.  **Database**: Update `schema.prisma` and run `migrate`.
3.  **Seed**: Create a seed script to ensure a default Profile exists.
4.  **Backend**: Implement `links.service.ts` and Zod schemas.
5.  **UI - Layout**: Implement `(dashboard)/layout.tsx` and Sidebar.
6.  **UI - List**: Implement Drag-and-Drop list with `dnd-kit`.
7.  **UI - Forms**: Implement Add/Edit interactions.
8.  **Polish**: Animations and optimistic UI.

## 4. Verification
- Can add a link?
- Can drag to reorder (and does it persist)?
- Does it look like `dashboard.html`?
