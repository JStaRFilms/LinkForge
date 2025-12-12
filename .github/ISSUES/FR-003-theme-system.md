# [Feature] FR-003: Theme System

## Labels
`MUS`, `enhancement`, `themes`, `design`

## User Story
As a **user**, I want to **choose from 2-3 themes (light, dark, custom)**, so that **my bio page reflects my personal brand**.

## Proposed Solution

### Overview
Implement a theme system with at least 3 preset themes. Users select their theme in the dashboard, and it's applied to their public profile.

### Theme Definitions

| Theme | Background | Text | Accent | Vibe |
| :--- | :--- | :--- | :--- | :--- |
| **Dark** (default) | `#0f0f0f` | `#ffffff` | `#a855f7` (purple) | Sleek, professional |
| **Light** | `#ffffff` | `#1a1a1a` | `#3b82f6` (blue) | Clean, minimal |
| **Gradient** | Purple→Pink gradient | `#ffffff` | `#ec4899` (pink) | Bold, creative |

### Components to Build

| Component | Type | Purpose |
| :--- | :--- | :--- |
| `ThemeSelector` | Client | Dropdown/cards to select theme in dashboard |
| `ThemeProvider` | Client | React context for theme state |
| `ThemePreview` | Client | Live preview of theme in dashboard |

### Implementation Approach

**Option A: CSS Variables (Recommended)**
```css
:root {
  --bg-primary: #0f0f0f;
  --text-primary: #ffffff;
  --accent: #a855f7;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent: #3b82f6;
}
```

**Option B: Tailwind Config + Class Switching**
```html
<body class="theme-dark">
  <!-- Tailwind classes reference theme -->
</body>
```

### Database Schema Change

```prisma
model Profile {
  // ... existing fields
  theme String @default("dark") // "dark" | "light" | "gradient"
}
```

## Acceptance Criteria

- [ ] User can select a theme from at least 3 options in dashboard
- [ ] Theme selection persists to database
- [ ] Public profile page renders with the selected theme
- [ ] Theme changes are visible in a live preview before saving
- [ ] Default theme is "dark" for new profiles
- [ ] Themes look cohesive and premium (not generic)
- [ ] Transition animation when switching themes

## Technical Notes

- Consider `next-themes` package for SSR-safe theme handling
- Use CSS custom properties for easy theming
- Preload theme preference to prevent flash of wrong theme
- Test contrast ratios for accessibility (WCAG AA)
