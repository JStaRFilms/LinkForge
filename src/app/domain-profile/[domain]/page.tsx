import { DomainsService } from "@/features/domains/services/domains.service";
import PublicProfile from "@/features/profile/components/PublicProfile";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
    const { domain } = await params;
    const profile = await DomainsService.getByDomain(domain);
    if (!profile) return { title: "Domain Not Connected" };

    return {
        title: `${profile.name} — LinkForge`,
        description: profile.bio || `Check out ${profile.name}'s links.`,
    };
}

export default async function CustomDomainPage({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const profile = await DomainsService.getByDomain(domain);

    if (!profile) {
        notFound();
    }

    return <PublicProfile profile={profile} />;
}
