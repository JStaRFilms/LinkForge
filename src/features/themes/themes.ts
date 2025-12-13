export type ThemeKey =
    | "dark"
    | "light"
    | "midnight"
    | "sunset"
    | "ocean"
    | "forest";

export interface ThemeConfig {
    name: string;
    background: string; // Tailwind class
    cardBg: string;
    cardBorder: string;
    text: string;
    textMuted: string;
    accent: string; // Gradient or solid for buttons/links
    accentHover: string;
}

export const THEMES: Record<ThemeKey, ThemeConfig> = {
    dark: {
        name: "Dark",
        background: "bg-slate-950",
        cardBg: "bg-slate-900/60",
        cardBorder: "border-slate-800/50",
        text: "text-slate-50",
        textMuted: "text-slate-400",
        accent: "bg-gradient-to-r from-primary-500 to-primary-600",
        accentHover: "hover:from-primary-600 hover:to-primary-700",
    },
    light: {
        name: "Light",
        background: "bg-slate-100",
        cardBg: "bg-white/80",
        cardBorder: "border-slate-200",
        text: "text-slate-900",
        textMuted: "text-slate-600",
        accent: "bg-gradient-to-r from-primary-500 to-primary-600",
        accentHover: "hover:from-primary-600 hover:to-primary-700",
    },
    midnight: {
        name: "Midnight",
        background: "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950",
        cardBg: "bg-indigo-900/30",
        cardBorder: "border-indigo-700/30",
        text: "text-indigo-50",
        textMuted: "text-indigo-300",
        accent: "bg-gradient-to-r from-indigo-500 to-violet-600",
        accentHover: "hover:from-indigo-600 hover:to-violet-700",
    },
    sunset: {
        name: "Sunset",
        background: "bg-gradient-to-br from-orange-950 via-rose-950 to-slate-950",
        cardBg: "bg-rose-900/30",
        cardBorder: "border-rose-700/30",
        text: "text-rose-50",
        textMuted: "text-rose-300",
        accent: "bg-gradient-to-r from-orange-500 to-rose-600",
        accentHover: "hover:from-orange-600 hover:to-rose-700",
    },
    ocean: {
        name: "Ocean",
        background: "bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950",
        cardBg: "bg-cyan-900/30",
        cardBorder: "border-cyan-700/30",
        text: "text-cyan-50",
        textMuted: "text-cyan-300",
        accent: "bg-gradient-to-r from-cyan-500 to-teal-600",
        accentHover: "hover:from-cyan-600 hover:to-teal-700",
    },
    forest: {
        name: "Forest",
        background: "bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950",
        cardBg: "bg-emerald-900/30",
        cardBorder: "border-emerald-700/30",
        text: "text-emerald-50",
        textMuted: "text-emerald-300",
        accent: "bg-gradient-to-r from-emerald-500 to-green-600",
        accentHover: "hover:from-emerald-600 hover:to-green-700",
    },
};

export function getTheme(key: string): ThemeConfig {
    if (key in THEMES) {
        return THEMES[key as ThemeKey];
    }
    return THEMES.dark;
}
