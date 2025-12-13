
# Feature: Links

API reference for the links feature (`src/features/links/`).

> [!TIP]
> For the full feature Blueprint (goals, architecture, implementation plan), see [FR-001-Link-Dashboard.md](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/docs/features/FR-001-Link-Dashboard.md).

---

## Server Actions

All actions are defined in [actions.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/links/actions.ts).

| Action | Description |
|--------|-------------|
| `createLinkAction(formData)` | Creates a new link for the current user |
| `updateLinkAction(formData)` | Updates an existing link |
| `deleteLinkAction(id)` | Deletes a link by ID |
| `toggleLinkAction(id)` | Toggles the `isEnabled` state |
| `reorderLinksAction(items)` | Reorders links by updating `order` field |

All actions use `requireProfileId()` from `@/lib/auth` for authentication.

---

## Schemas

Defined in [schemas.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/links/schemas.ts).

### `createLinkSchema`
```typescript
z.object({
    title: z.string().min(1).max(100),
    url: z.string().url(),
    icon: z.string().optional().default("🚀"),
})
```

### `updateLinkSchema`
Extends `createLinkSchema.partial()` with:
- `id: z.string()` (required)
- `isEnabled: z.boolean().optional()`

### `reorderLinksSchema`
```typescript
z.array(z.object({ id: z.string(), order: z.number() }))
```

---

## Service Layer

Business logic is in [links.service.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/links/services/links.service.ts).

| Method | Description |
|--------|-------------|
| `getLinks(profileId)` | Fetch all links for a profile, ordered by `order` |
| `createLink(profileId, data)` | Creates link with auto-calculated order |
| `updateLink(profileId, data)` | Updates link (validates ownership) |
| `deleteLink(profileId, id)` | Deletes link (validates ownership) |
| `toggleLink(profileId, id)` | Toggles `isEnabled` flag |
| `reorderLinks(profileId, items)` | Batch updates order in transaction |
| `trackClick(id)` | Increments click count |
