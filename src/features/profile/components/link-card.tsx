"use client";

import { Link as LinkType } from "@prisma/client";
import { trackAndRedirectAction } from "../actions";
import { ThemeConfig } from "@/features/themes/themes";

interface LinkCardProps {
    link: LinkType;
    index: number;
    theme: ThemeConfig;
}

export default function LinkCard({ link, index, theme }: LinkCardProps) {
    const isFeatured = index === 3 && link.icon === "✨"; // First link with ✨ is featured

    if (isFeatured) {
        return (
            <form action={trackAndRedirectAction.bind(null, link.id, link.url)}>
                <button
                    type="submit"
                    className={`link-card block w-full p-5 ${theme.accent} ${theme.accentHover} rounded-2xl text-center group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards text-white`}
                    style={{ animationDelay: `${(index - 3) * 0.1}s` }}
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{link.icon}</span>
                        <span className="font-bold text-lg">{link.title}</span>
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </form>
        );
    }

    return (
        <form action={trackAndRedirectAction.bind(null, link.id, link.url)} className="w-full">
            <button
                type="submit"
                className={`link-card block w-full p-4 ${theme.cardBg} border ${theme.cardBorder} backdrop-blur-sm rounded-2xl group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards text-left`}
                style={{ animationDelay: `${(index - 3) * 0.1}s` }}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${theme.accent} flex items-center justify-center shrink-0`}>
                        <span className="text-xl">{link.icon || "🔗"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className={`font-semibold block truncate ${theme.text}`}>{link.title}</span>
                    </div>
                    <svg className={`w-5 h-5 ${theme.textMuted} group-hover:text-white group-hover:translate-x-1 transition-all`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </button>
        </form>
    );
}
