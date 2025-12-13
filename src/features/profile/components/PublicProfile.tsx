import LinkCard from "@/features/profile/components/link-card";
import { getTheme } from "@/features/themes/themes";

interface ProfileData {
    username: string;
    name: string | null;
    bio: string | null;
    avatar: string | null;
    theme: string;
    links: any[]; // Using any to avoid importing simplified Link type complexity, but ideally should be typed
}

export default function PublicProfile({ profile }: { profile: ProfileData }) {
    const theme = getTheme(profile.theme);

    return (
        <div
            className={`min-h-screen ${theme.background} ${theme.text} font-sans overflow-x-hidden relative selection:bg-primary-500/30`}
        >
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "-3s" }}
                ></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 max-w-md mx-auto px-4 py-12">
                {/* Profile Header */}
                <header className="text-center mb-10">
                    {/* Avatar */}
                    <div className="relative inline-block mb-6 animate-in fade-in zoom-in duration-500">
                        <div
                            className="relative p-1 rounded-full"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-sm opacity-70"></div>
                            <div
                                className={`relative w-28 h-28 rounded-full overflow-hidden ${theme.cardBg} border-4 border-slate-950 flex items-center justify-center`}
                            >
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name || ""}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                                            {profile.name?.substring(0, 2).toUpperCase() ||
                                                profile.username.substring(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Name & Bio */}
                    <h1
                        className={`text-2xl font-bold mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-forwards ${theme.text}`}
                    >
                        {profile.name}
                    </h1>
                    <p
                        className={`${theme.textMuted} mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-forwards max-w-xs mx-auto`}
                    >
                        {profile.bio}
                    </p>
                </header>

                {/* Links */}
                <div className="space-y-4">
                    {profile.links.map((link, index) => (
                        <LinkCard
                            key={link.id}
                            link={link}
                            index={index + 3}
                            theme={theme}
                        />
                    ))}

                    {profile.links.length === 0 && (
                        <div className={`text-center py-8 ${theme.textMuted}`}>
                            No links available yet.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer
                    className={`mt-12 text-center animate-in fade-in duration-700 delay-500 ${theme.textMuted}`}
                >
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity text-sm font-medium"
                    >
                        <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                            LF
                        </div>
                        Made with LinkForge
                    </a>
                </footer>
            </main>
        </div>
    );
}
