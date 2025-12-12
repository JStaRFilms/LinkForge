# Feature Blueprint: Public Profile Page (FR-002)

## 1. Goal
Create the public-facing "link-in-bio" page that visitors see.
Key features:
- Dynamic route `/[username]`
- Render profile info (Avatar, Name, Bio)
- Render list of links
- Track clicks on links by incrementing counters
- Responsive and fast (ISR or Dynamic)

## 2. Architecture & Components

**Path:** `src/features/profile/`

- **Components:**
  - `ProfileLayout` (The card styling, background)
  - `PublicLinkItem` (The clickable link button with tracking)
  - `ThemeInjector` (Applies theme colors - possibly part of FR-003, but we basic structure now)

- **Services (`src/features/profile/services/profile.service.ts`):**
  - `getProfileByUsername(username)`
  - `incrementLinkClick(linkId)`

- **Data Flow:**
  - `page.tsx` fetches Profile + Links (Server Component).
  - Renders UI.
  - Clicking a link calls a Server Action (or API route + redirect) to track click before navigation.
  *Optimization:* To keep it fast, we might use a Client Component for the link that fires a `navigator.sendBeacon` or a non-blocking fetch to an API route for analytics, then navigates immediately. Or use a Server Action that redirects.
  *Decision:* Use **Server Action** that redirects. It ensures the click is counted. Fast enough on Vercel.

## 3. Implementation Plan

1.  **Service**: Add `getProfileByUsername` to `profile.service.ts` (need to create).
2.  **Service**: Add `trackClick` to `links.service.ts`.
3.  **Page**: Create `src/app/[username]/page.tsx`.
4.  **UI**: Implement the "Phone" look from the mockup `profile.html`.
5.  **Tracking**: Implement the click tracking mechanism.

## 4. Verification
- Visit `/johndoe` -> See profile.
- Click link -> Redirects to URL.
- Check dashboard -> Click count increased.
