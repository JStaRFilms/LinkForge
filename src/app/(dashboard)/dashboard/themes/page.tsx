import { prisma } from "@/lib/prisma";
import ThemePicker from "@/features/themes/components/theme-picker";
import Link from "next/link";

async function getProfile() {
    return prisma.profile.findFirst({ where: { username: "johndoe" } });
}

export default async function ThemesPage() {
    const profile = await getProfile();

    if (!profile) {
        return <div>Profile not found.</div>;
    }

    return (
        <>
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Themes</h1>
                    <p className="text-slate-400 mt-1">Customize your public profile appearance</p>
                </div>

                <Link
                    href={`/${profile.username}`}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-slate-800/50 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Preview
                </Link>
            </header>

            <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Select a Theme</h2>
                <ThemePicker currentTheme={profile.theme} />
            </div>

            <p className="text-sm text-slate-500 mt-6 text-center">
                Your selected theme will be applied to your public profile page.
            </p>
        </>
    );
}
