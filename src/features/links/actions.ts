"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { LinksService } from "./services/links.service";
import { createLinkSchema, updateLinkSchema, reorderLinksSchema } from "./schemas";

// TODO: Replace with real auth ID when auth is implemented
const DEMO_PROFILE_ID = "cm4o2wb8y000008l43w6d5555";

// Helper to simulate auth
async function getAuthIdentifier() {
    // In a real app: const session = await auth(); return session.user.id;
    // For now, we query the seed profile or fail
    const { prisma } = await import("@/lib/prisma");
    const profile = await prisma.profile.findFirst({ where: { username: "johndoe" } });
    if (!profile) throw new Error("Demo profile not found. Run db seed.");
    return profile.id;
}

export async function createLinkAction(formData: FormData) {
    const profileId = await getAuthIdentifier();

    const rawData = {
        title: formData.get("title"),
        url: formData.get("url"),
        icon: formData.get("icon"),
    };

    const parsed = createLinkSchema.safeParse(rawData);

    if (!parsed.success) {
        return { error: parsed.error.flatten() };
    }

    await LinksService.createLink(profileId, parsed.data);
    revalidatePath("/dashboard");
    return { success: true };
}

export async function toggleLinkAction(id: string) {
    const profileId = await getAuthIdentifier();
    await LinksService.toggleLink(profileId, id);
    revalidatePath("/dashboard");
}

export async function deleteLinkAction(id: string) {
    const profileId = await getAuthIdentifier();
    await LinksService.deleteLink(profileId, id);
    revalidatePath("/dashboard");
}

export async function updateLinkAction(formData: FormData) {
    const profileId = await getAuthIdentifier();

    const rawData = {
        id: formData.get("id") as string,
        title: formData.get("title"),
        url: formData.get("url"),
        icon: formData.get("icon"),
    };

    const parsed = updateLinkSchema.safeParse(rawData);

    if (!parsed.success) {
        return { error: parsed.error.flatten() };
    }

    await LinksService.updateLink(profileId, parsed.data);
    revalidatePath("/dashboard");
    return { success: true };
}

export async function reorderLinksAction(items: { id: string; order: number }[]) {
    const profileId = await getAuthIdentifier();
    const parsed = reorderLinksSchema.safeParse(items);

    if (!parsed.success) return { error: "Invalid data" };

    await LinksService.reorderLinks(profileId, parsed.data);
    revalidatePath("/dashboard");
}
