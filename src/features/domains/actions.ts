"use server";

import { revalidatePath } from "next/cache";
import { DomainsService } from "./services/domains.service";
import { createDomainSchema } from "./schemas";
import { getCurrentProfile } from "@/lib/auth";

export async function addDomain(formData: FormData) {
    const profile = await getCurrentProfile();
    if (!profile) {
        return { error: "Unauthorized" };
    }

    const rawDomain = formData.get("domain") as string;
    const validation = createDomainSchema.safeParse({
        domain: rawDomain,
        profileId: profile.id,
    });

    if (!validation.success) {
        return { error: validation.error.flatten().fieldErrors.domain?.[0] || "Invalid domain" };
    }

    try {
        await DomainsService.create(validation.data);
        revalidatePath("/dashboard");
        return { success: true };
    } catch (e: any) {
        return { error: e.message || "Failed to add domain" };
    }
}

export async function deleteDomain(domainId: string) {
    const profile = await getCurrentProfile();
    if (!profile) {
        return { error: "Unauthorized" };
    }

    try {
        await DomainsService.delete(domainId, profile.id);
        revalidatePath("/dashboard");
        return { success: true };
    } catch (e: any) {
        return { error: e.message || "Failed to remove domain" };
    }
}
