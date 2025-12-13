# Feature Blueprint: Theme System (FR-003)

## 1. Goal
Allow users to customize the appearance of their public profile page. This includes:
- Preset themes (Dark, Light, Midnight, Sunset, Ocean, etc.)
- Custom accent color (stretch goal)
- Theme persists per-profile in the database.

## 2. Architecture

### Database
The `Profile` model already has a `theme` field (`String @default("dark")`). We will use this to store the theme key.

### Themes Definition
We define themes as a TypeScript constant map. Each theme specifies:
- `name`: Display name
- `background`: Tailwind bg class or gradient
- `text`: Tailwind text class
- `card`: Card background/border styles
- `accent`: Primary accent for links/buttons

### Components
- **`ThemePicker` (Client):** UI for selecting a theme in the dashboard.
- **`ThemeProvider` (Client):** Applies theme CSS variables or classes to the public profile.

### Data Flow
1. User selects theme in `/dashboard/themes`.
2. Server Action updates `profile.theme`.
3. Public profile page reads `profile.theme` and applies styles.

## 3. Implementation Plan
1. Define `THEMES` constant in `src/features/themes/themes.ts`.
2. Create `updateProfileTheme` Server Action.
3. Create `/dashboard/themes/page.tsx` with `ThemePicker`.
4. Update `[username]/page.tsx` to apply theme dynamically.

## 4. Verification
- Select "Ocean" theme in dashboard.
- Visit public profile -> Background and accents should change.
