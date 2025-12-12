# [Feature] FR-002: Public Profile Page

## Labels
`MUS`, `enhancement`, `profile`, `public`

## User Story
As a **visitor**, I want to **view a user's link-in-bio page**, so that **I can access their links and connect with them**.

## Proposed Solution

### Overview
Build the public-facing profile page at `/[username]` that displays the user's bio, avatar, and clickable links. This is the "product" — what visitors see.

### Components to Build

| Component | Type | Purpose |
| :--- | :--- | :--- |
| `ProfilePage` | Server | Dynamic route, fetches profile data |
| `ProfileHeader` | Server | Avatar, name, bio display |
| `LinkButton` | Client | Clickable link with tracking |
| `ProfileFooter` | Server | "Made with LinkForge" branding |

### Key Features

1. **Dynamic Route:** `/[username]` resolves to the user's profile
2. **Click Tracking:** Each link click increments the counter before redirect
3. **SEO Optimized:** Proper meta tags, Open Graph, Twitter Cards
4. **Fast Loading:** RSC for initial render, minimal client JS

### Data Flow

```
1. Visitor navigates to /johndoe
2. Server fetches profile from DB (RSC)
3. Profile renders with links
4. Visitor clicks link → Client tracks click → Redirect
```

### API Routes

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `GET /api/profile/[username]` | GET | Fetch public profile data |
| `POST /api/links/[id]/click` | POST | Increment click count |

## Acceptance Criteria

- [ ] Profile page renders at `/{username}` with correct user data
- [ ] Page displays profile name, bio, and avatar (placeholder if none)
- [ ] All links are displayed in correct order
- [ ] Clicking a link opens the URL in a new tab
- [ ] Click is tracked before navigation
- [ ] 404 page shown for non-existent usernames
- [ ] Page has proper Open Graph meta tags for sharing
- [ ] Page loads in < 2 seconds (LCP)
- [ ] Fully responsive on mobile devices

## Technical Notes

- Use `generateMetadata` for dynamic SEO
- Implement click tracking via `navigator.sendBeacon` for fire-and-forget
- Consider `rel="noopener noreferrer"` for external links
- Theme should be applied based on profile settings
