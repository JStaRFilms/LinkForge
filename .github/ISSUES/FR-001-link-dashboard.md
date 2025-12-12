# [Feature] FR-001: Link Dashboard

## Labels
`MUS`, `enhancement`, `dashboard`, `links`

## User Story
As a **user**, I want to **manage my links (add, edit, delete, reorder)**, so that **I can keep my bio page updated with my latest content**.

## Proposed Solution

### Overview
Build a full-featured link management dashboard at `/dashboard` with CRUD operations and drag-and-drop reordering.

### Components to Build

| Component | Type | Purpose |
| :--- | :--- | :--- |
| `DashboardPage` | Server | Main dashboard container, fetches initial data |
| `LinkList` | Client | Renders sortable list of links |
| `LinkCard` | Client | Individual link display with edit/delete buttons |
| `LinkForm` | Client | Add/edit link modal form |
| `DragHandle` | Client | Visual drag indicator |

### API Routes

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `GET /api/links` | GET | Fetch all links for a profile |
| `POST /api/links` | POST | Create a new link |
| `PUT /api/links/[id]` | PUT | Update a link |
| `DELETE /api/links/[id]` | DELETE | Delete a link |
| `PATCH /api/links/reorder` | PATCH | Update link order |

### Database Schema

```prisma
model Link {
  id        String   @id @default(cuid())
  title     String
  url       String
  order     Int
  clicks    Int      @default(0)
  profile   Profile  @relation(fields: [profileId], references: [id])
  profileId String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Acceptance Criteria

- [ ] User can view all their links in a dashboard at `/dashboard`
- [ ] User can add a new link with title and URL
- [ ] User can edit an existing link's title and URL
- [ ] User can delete a link with confirmation
- [ ] User can reorder links via drag-and-drop
- [ ] Link order persists after page refresh
- [ ] Form validates URL format before submission
- [ ] Mobile-responsive layout (stacked cards on mobile)

## Technical Notes

- Use `dnd-kit` or similar for drag-and-drop (lightweight, accessible)
- Optimistic UI updates for better UX
- Debounce reorder API calls to reduce requests
