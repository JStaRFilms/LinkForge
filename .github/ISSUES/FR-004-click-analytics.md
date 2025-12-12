# [Feature] FR-004: Click Analytics

## Labels
`MUS`, `enhancement`, `analytics`, `dashboard`

## User Story
As a **user**, I want to **track how many times each link is clicked**, so that **I can measure engagement and optimize my bio page**.

## Proposed Solution

### Overview
Track click counts per link and display basic analytics in the dashboard. Start simple, scale later.

### Metrics to Track (MUS)

| Metric | Description | Implementation |
| :--- | :--- | :--- |
| **Total Clicks** | Lifetime clicks per link | Increment counter in DB |
| **Click Trend** | Last 7 days (optional) | Separate ClickEvent table |

### Components to Build

| Component | Type | Purpose |
| :--- | :--- | :--- |
| `AnalyticsCard` | Server | Summary stats (total clicks, top link) |
| `LinkStats` | Client | Per-link click count display |
| `ClickSparkline` | Client | Mini chart showing trend (optional) |

### Data Flow

```
1. Visitor clicks link on public profile
2. Client sends POST to /api/links/[id]/click
3. Server increments Link.clicks
4. (Optional) Server logs ClickEvent with timestamp
5. Dashboard fetches and displays stats
```

### API Routes

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `POST /api/links/[id]/click` | POST | Increment click count |
| `GET /api/analytics` | GET | Fetch analytics summary |
| `GET /api/analytics/[linkId]` | GET | Fetch per-link detailed stats |

### Database Schema (Optional Enhancement)

```prisma
// For basic tracking, just use Link.clicks
// For detailed tracking, add:

model ClickEvent {
  id        String   @id @default(cuid())
  link      Link     @relation(fields: [linkId], references: [id])
  linkId    String
  timestamp DateTime @default(now())
  // Future: referrer, country, device
}
```

## Acceptance Criteria

- [ ] Each link displays its click count in the dashboard
- [ ] Click count increments when a visitor clicks a link
- [ ] Dashboard shows total clicks across all links
- [ ] Dashboard highlights the "top performing" link
- [ ] Click tracking does not block or slow down navigation
- [ ] Analytics data is accurate (no duplicate counts on refresh)

## Technical Notes

- Use `navigator.sendBeacon()` for non-blocking click tracking
- Consider debouncing to prevent spam clicks from inflating counts
- For MUS, a simple counter is sufficient; event logging can be added later
- If using ClickEvent table, add index on `linkId` and `timestamp`

## Future Enhancements (Post-MUS)

- [ ] Time-series data (clicks per day/week)
- [ ] Geographic breakdown (requires IP geolocation)
- [ ] Referrer tracking (where clicks come from)
- [ ] Export analytics as CSV
