"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
    {
        href: "/dashboard",
        label: "Links",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        ),
    },
    {
        href: "/dashboard/analytics",
        label: "Analytics",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        href: "/dashboard/themes",
        label: "Themes",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 glass border-r border-border p-6 hidden md:block fixed h-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#6366F1" }} />
                            <stop offset="100%" style={{ stopColor: "#F97316" }} />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="url(#sideGrad)" strokeWidth="4" fill="none" />
                    <path d="M30 42 C30 36, 36 30, 44 30 L56 30 C64 30, 70 36, 70 42 L70 44 C70 50, 64 54, 56 54 L50 54" stroke="url(#sideGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
                    <path d="M70 58 C70 64, 64 70, 56 70 L44 70 C36 70, 30 64, 30 58 L30 56 C30 50, 36 46, 44 46 L50 46" stroke="url(#sideGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
                <span className="text-xl font-bold gradient-text">LinkForge</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                ? "bg-primary-500/10 text-primary-500"
                                : "text-muted hover:bg-input hover:text-foreground"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Profile Preview Link */}
            <div className="absolute bottom-6 left-6 right-6">
                <Link href="/johndoe" target="_blank" className="flex items-center gap-3 px-4 py-3 glass rounded-xl hover:bg-input transition-colors">
                    <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-sm text-muted">View Profile</span>
                </Link>
            </div>
        </aside>
    );
}
