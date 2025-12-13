# Feature Blueprint: Theme System (FR-003)

## 1. Goal
Allow users to customize the appearance of their public profile page by selecting from preset themes. Each theme defines colors, gradients, and text styling.

## 2. User Flow
1. User navigates to **Dashboard → Themes**
2. Sees grid of theme preview cards
3. Clicks a theme card to select it
4. Public profile (`/[username]`) updates to reflect the selected theme

## 3. Architecture

### Data Model
Theme preference is stored on the `Profile` model:
```prisma
model Profile {
  theme String @default("dark")  // ← ThemeKey string
  // ... other fields
}
```

### Theme Configuration
Themes are defined in [themes.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/themes/themes.ts):
```typescript
export type ThemeKey = "dark" | "light" | "midnight" | "sunset" | "ocean" | "forest";

export const THEMES: Record<ThemeKey, ThemeConfig> = { ... };
```

Each `ThemeConfig` includes:
- `background` - Page background classes
- `cardBg` / `cardBorder` - Link card styling
- `text` / `textMuted` - Typography colors
- `accent` / `accentHover` - Button gradients

### Key Files
| File | Purpose |
|------|---------|
| [themes.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/themes/themes.ts) | Theme definitions and config |
| [schemas.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/themes/schemas.ts) | Zod validation for theme keys |
| [actions.ts](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/themes/actions.ts) | `updateThemeAction()` server action |
| [theme-picker.tsx](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/features/themes/components/theme-picker.tsx) | Theme selection UI |
| [page.tsx](file:///c:/CreativeOS/01_Projects/Code/Personal_Stuff/2025-12-12_LinkForge/src/app/(dashboard)/dashboard/themes/page.tsx) | Themes dashboard page |

## 4. API

### `updateThemeAction(theme: string)`
Server action to update the current user's theme.

**Parameters:**
- `theme` - Theme key string (validated with Zod `themeKeySchema`)

**Returns:**
- `{ success: true }` on success
- `{ error: string }` on validation failure

**Revalidates:**
- `/dashboard/themes`
- `/${profile.username}` (dynamic, based on current user)

## 5. Verification
- Select "Sunset" theme in dashboard → open public profile → should show orange/rose gradient
- Invalid theme submission returns error (API won't crash)
- Theme persists after page refresh
