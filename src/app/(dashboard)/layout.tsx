import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";
import { getCurrentProfile } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    let username = "profile"; // Fallback
    try {
        const profile = await getCurrentProfile();
        username = profile.username;
    } catch {
        // Will be handled by child pages
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar username={username} />
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
