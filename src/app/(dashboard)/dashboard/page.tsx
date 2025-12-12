import { LinksService } from "@/features/links/services/links.service";
import LinkList from "@/features/links/components/link-list"; // To be created
import AddLinkButton from "@/features/links/components/add-link-button"; // To be created

// Simulating auth for now
const DEMO_PROFILE_ID = "cmj3gwc8e000010771fcmgwg5";

async function getProfileId() {
    const { prisma } = await import("@/lib/prisma");
    const profile = await prisma.profile.findFirst({ where: { username: "johndoe" } });
    return profile?.id || "";
}

export default async function DashboardPage() {
    const profileId = await getProfileId();
    const links = await LinksService.getLinks(profileId);

    // Calculate stats
    const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
    const activeLinks = links.filter((l) => l.isEnabled).length;
    const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];

    return (
        <>
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Your Links</h1>
                    <p className="text-slate-400 mt-1">Manage and organize your bio links</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-3 glass rounded-xl hover:bg-slate-800/50 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>

                    <AddLinkButton />
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">Total Clicks</span>
                        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">+12%</span>
                    </div>
                    <div className="text-4xl font-bold gradient-text">{totalClicks.toLocaleString()}</div>
                    <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                    </div>
                </div>

                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">Active Links</span>
                    </div>
                    <div className="text-4xl font-bold">{activeLinks}</div>
                    <p className="text-sm text-slate-500 mt-3">of {links.length} total links</p>
                </div>

                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">Top Performer</span>
                    </div>
                    <div className="text-xl font-bold truncate">{topLink?.title || "N/A"}</div>
                    <p className="text-sm text-slate-500 mt-3">{topLink?.clicks ? `${topLink.clicks.toLocaleString()} clicks` : "No clicks yet"}</p>
                </div>
            </div>

            {/* Links List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-300 mb-4">Links</h2>
                <LinkList links={links} />
            </div>
        </>
    );
}
