"use client";

import { Link as LinkType } from "@prisma/client";
import { trackAndRedirectAction } from "../actions";

interface LinkCardProps {
    link: LinkType;
    index: number;
}

export default function LinkCard({ link, index }: LinkCardProps) {
    const isFeatured = index === 0 && link.icon === "✨"; // Simple logic for "featured" from seed data

    if (isFeatured) {
        return (
            <form action={trackAndRedirectAction.bind(null, link.id, link.url)}>
                <button
                    type="submit"
                    className="link-card block w-full p-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl text-center group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{link.icon}</span>
                        <span className="font-bold text-lg text-white">{link.title}</span>
                        <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    {/* <p className="text-primary-100 text-sm mt-1">Check it out 🚀</p> */}
                </button>
            </form>
        );
    }

    return (
        <form action={trackAndRedirectAction.bind(null, link.id, link.url)} className="w-full">
            <button
                type="submit"
                className="link-card block w-full p-4 glass rounded-2xl group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards text-left"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shrink-0 border border-slate-700/50">
                        <span className="text-xl">{link.icon || "🔗"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="font-semibold block truncate">{link.title}</span>
                        {/* <span className="text-sm text-slate-400">Subtitle if exists</span> */}
                    </div>
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </button>
        </form>
    );
}
