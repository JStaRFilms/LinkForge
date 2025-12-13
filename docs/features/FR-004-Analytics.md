# Feature Blueprint: Click Analytics (FR-004)

## 1. Goal
Provide users with insights into their link performance:
- Total clicks overview (already displayed on dashboard)
- Click breakdown per link
- Simple time-based view (optional: daily/weekly aggregation)

For MUS, we will:
- Show a dedicated analytics page with link-by-link stats.
- Display a bar chart (simple CSS-based, no charting library for speed).

## 2. Architecture

### Database
Currently, `Link.clicks` stores total clicks. For time-series data, we would need a `Click` event model. **MUS Decision:** Keep it simple with just total clicks for now.

### Components
- **AnalyticsPage (Server):** Fetches all links, sorts by clicks, displays stats.
- **ClickBar (Client or Server):** Simple horizontal bar representing relative click count.

### Data Flow
1. User navigates to `/dashboard/analytics`.
2. Server fetches links with click data.
3. Render visual bars.

## 3. Implementation Plan
1. Create `/dashboard/analytics/page.tsx`.
2. Implement simple bar chart UI.
3. Add "top performer" and "total clicks" summaries.

## 4. Verification
- Visit `/dashboard/analytics`.
- See all links with their click counts visualized.
