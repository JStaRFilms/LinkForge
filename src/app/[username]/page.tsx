import { ProfileService } from "@/features/profile/services/profile.service";
import LinkCard from "@/features/profile/components/link-card";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    const profile = await ProfileService.getProfileByUsername(params.username);
    if (!profile) return { title: "Profile Not Found" };

    return {
        title: `${profile.name} (@${profile.username}) — LinkForge`,
        description: profile.bio || `Check out ${profile.name}'s links on LinkForge.`,
    };
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
    const profile = await ProfileService.getProfileByUsername(params.username);

    if (!profile) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans overflow-x-hidden relative selection:bg-primary-500/30">

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }}></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 max-w-md mx-auto px-4 py-12">

                {/* Profile Header */}
                <header className="text-center mb-10">
                    {/* Avatar */}
                    <div className="relative inline-block mb-6 animate-in fade-in zoom-in duration-500">
                        <div className="relative p-1 bg-slate-950 rounded-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-sm opacity-70"></div>
                            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-950 flex items-center justify-center">
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt={profile.name || ""} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                                            {profile.name?.substring(0, 2).toUpperCase() || profile.username.substring(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Online indicator placeholder */}
                        {/* <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-950"></div> */}
                    </div>

                    {/* Name & Bio */}
                    <h1 className="text-2xl font-bold mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-forwards">
                        {profile.name}
                    </h1>
                    <p className="text-slate-400 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-forwards max-w-xs mx-auto">
                        {profile.bio}
                    </p>

                    {/* Social Icons (Placeholder for now) */}
                    {/* <div className="flex justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-forwards">
                    <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-slate-800 transition-colors">
                        <span className="sr-only">Social</span>
                        🔗
                    </button>
                </div> */}
                </header>

                {/* Links */}
                <div className="space-y-4">
                    {profile.links.map((link, index) => (
                        <LinkCard key={link.id} link={link} index={index + 3} /> // index + 3 for stagger delay
                    ))}

                    {profile.links.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            No links available yet.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center animate-in fade-in duration-700 delay-500">
                    <a href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">
                        <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">LF</div>
                        Made with LinkForge
                    </a>
                </footer>

            </main>
        </div>
    );
}
