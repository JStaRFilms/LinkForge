import { LinksService } from "@/features/links/services/links.service";
import { getCurrentProfile } from "@/lib/auth";
import LinkList from "@/features/links/components/link-list";
import AddLinkButton from "@/features/links/components/add-link-button";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";

export default async function DashboardPage() {
    const profile = await getCurrentProfile();

    if (!profile) {
        return (
            <div className="glass rounded-2xl p-6 text-center">
                <h2 className="text-xl font-bold text-amber-500">No Profile Yet</h2>
                <p className="text-muted mt-2">
                    Create your first profile using the switcher in the sidebar.
                </p>
            </div>
        );
    }

    let links;
    try {
        links = await LinksService.getLinks(profile.id);
    } catch {
        return (
            <div className="glass rounded-2xl p-6 text-center">
                <h2 className="text-xl font-bold text-red-500">Error Loading Links</h2>
                <p className="text-muted mt-2">Failed to fetch links. Please try again.</p>
            </div>
        );
    }

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
                    <p className="text-muted mt-1">Manage and organize your bio links</p>
                </div>

                <div className="flex items-center gap-4">
                    <DarkModeToggle />

                    <AddLinkButton />
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted">Total Clicks</span>
                        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-600 rounded-full">+12%</span>
                    </div>
                    <div className="text-4xl font-bold gradient-text">{totalClicks.toLocaleString()}</div>
                    <div className="mt-3 h-1.5 bg-input rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                    </div>
                </div>

                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted">Active Links</span>
                    </div>
                    <div className="text-4xl font-bold">{activeLinks}</div>
                    <p className="text-sm text-muted mt-3">of {links.length} total links</p>
                </div>

                <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted">Top Performer</span>
                    </div>
                    <div className="text-xl font-bold truncate">{topLink?.title || "N/A"}</div>
                    <p className="text-sm text-muted mt-3">{topLink?.clicks ? `${topLink.clicks.toLocaleString()} clicks` : "No clicks yet"}</p>
                </div>
            </div>

            {/* Links List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-muted-foreground mb-4">Links</h2>
                <LinkList links={links} />
            </div>
        </>
    );
}
