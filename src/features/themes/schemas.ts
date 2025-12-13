import { z } from "zod";

/**
 * Zod schema for validating theme keys.
 * Must match the keys in THEMES from ./themes.ts
 */
export const themeKeySchema = z.enum([
    "dark",
    "light",
    "midnight",
    "sunset",
    "ocean",
    "forest",
]);

export type ThemeKeyInput = z.infer<typeof themeKeySchema>;
