"use client";

import { THEMES, ThemeKey } from "../themes";
import { updateThemeAction } from "../actions";
import { useState } from "react";

interface ThemePickerProps {
    currentTheme: string;
}

export default function ThemePicker({ currentTheme }: ThemePickerProps) {
    const [selected, setSelected] = useState<string>(currentTheme);
    const [isPending, setIsPending] = useState(false);

    async function handleSelect(key: string) {
        setSelected(key);
        setIsPending(true);
        await updateThemeAction(key);
        setIsPending(false);
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(THEMES).map(([key, theme]) => (
                <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={isPending}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-200 ${selected === key
                            ? "border-primary-500 ring-2 ring-primary-500/30"
                            : "border-slate-700 hover:border-slate-600"
                        } ${isPending ? "opacity-50" : ""}`}
                >
                    {/* Theme Preview */}
                    <div
                        className={`h-24 rounded-xl mb-3 ${theme.background} flex items-center justify-center overflow-hidden`}
                    >
                        <div className="w-16 h-10 rounded-lg ${theme.cardBg} border ${theme.cardBorder}"></div>
                    </div>

                    {/* Theme Name */}
                    <span className="font-semibold">{theme.name}</span>

                    {/* Selected Indicator */}
                    {selected === key && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}
