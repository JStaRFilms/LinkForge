import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { ProfileService } from "@/features/profile/services/profile.service";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await getCurrentUser();
    const profiles = await ProfileService.getProfilesByUserId(user.id);
    const activeProfile = await getCurrentProfile();

    return (
        <div className="flex min-h-screen">
            <Sidebar
                username={activeProfile?.username}
                profiles={profiles}
                activeProfileId={activeProfile?.id || ""}
            />
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
