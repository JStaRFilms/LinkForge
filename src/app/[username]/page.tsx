import { ProfileService } from "@/features/profile/services/profile.service";
import LinkCard from "@/features/profile/components/link-card";
import { getTheme } from "@/features/themes/themes";
import PublicProfile from "@/features/profile/components/PublicProfile";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
    const { username } = await params;
    const profile = await ProfileService.getProfileByUsername(username);
    if (!profile) return { title: "Profile Not Found" };

    return {
        title: `${profile.name} (@${profile.username}) — LinkForge`,
        description: profile.bio || `Check out ${profile.name}'s links on LinkForge.`,
    };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const profile = await ProfileService.getProfileByUsername(username);

    if (!profile) {
        notFound();
    }

    const theme = getTheme(profile.theme);

    return <PublicProfile profile={profile} />;
}
