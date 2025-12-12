import { LinksService } from "@/features/links/services/links.service";
import { prisma } from "@/lib/prisma";

async function getProfileId() {
    const profile = await prisma.profile.findFirst({ where: { username: "johndoe" } });
    return profile?.id || "";
}

export default async function AnalyticsPage() {
    const profileId = await getProfileId();
    const links = await LinksService.getLinks(profileId);

    const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
    const maxClicks = Math.max(...links.map((l) => l.clicks), 1); // Avoid division by zero
    const sortedLinks = [...links].sort((a, b) => b.clicks - a.clicks);

    return (
        <>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-slate-400 mt-1">Track your link performance</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass rounded-2xl p-6">
                    <span className="text-sm text-slate-400">Total Clicks</span>
                    <div className="text-5xl font-bold gradient-text mt-2">{totalClicks.toLocaleString()}</div>
                </div>

                <div className="glass rounded-2xl p-6">
                    <span className="text-sm text-slate-400">Top Performer</span>
                    <div className="text-2xl font-bold mt-2 truncate">
                        {sortedLinks[0]?.title || "No links yet"}
                    </div>
                    <p className="text-slate-500 text-sm mt-1">
                        {sortedLinks[0]?.clicks.toLocaleString() || 0} clicks
                        {totalClicks > 0 && ` (${Math.round((sortedLinks[0]?.clicks / totalClicks) * 100)}%)`}
                    </p>
                </div>
            </div>

            {/* Click Breakdown */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-6">Click Breakdown</h2>

                {sortedLinks.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No link data available.</p>
                ) : (
                    <div className="space-y-4">
                        {sortedLinks.map((link, index) => {
                            const percentage = maxClicks > 0 ? (link.clicks / maxClicks) * 100 : 0;
                            return (
                                <div key={link.id} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-500 text-sm w-6">#{index + 1}</span>
                                            <span className="text-xl">{link.icon || "🔗"}</span>
                                            <span className="font-medium truncate max-w-[200px]">{link.title}</span>
                                        </div>
                                        <span className="text-slate-400 font-semibold">{link.clicks.toLocaleString()}</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden ml-9">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <p className="text-sm text-slate-500 mt-6 text-center">
                Analytics are updated in real-time when visitors click your links.
            </p>
        </>
    );
}
