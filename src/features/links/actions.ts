"use server";

import { revalidatePath } from "next/cache";
import { requireProfileId } from "@/lib/auth";
import { LinksService } from "./services/links.service";
import { createLinkSchema, updateLinkSchema, reorderLinksSchema } from "./schemas";

export async function createLinkAction(formData: FormData) {
    const profileId = await requireProfileId();

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
    const profileId = await requireProfileId();
    await LinksService.toggleLink(profileId, id);
    revalidatePath("/dashboard");
}

export async function deleteLinkAction(id: string) {
    const profileId = await requireProfileId();
    await LinksService.deleteLink(profileId, id);
    revalidatePath("/dashboard");
}

export async function updateLinkAction(formData: FormData) {
    const profileId = await requireProfileId();

    // Validate id field before processing
    const id = formData.get("id");
    if (!id || typeof id !== "string") {
        return { error: { fieldErrors: {}, formErrors: ["Missing link ID"] } };
    }

    const rawData = {
        id,
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
    const profileId = await requireProfileId();
    const parsed = reorderLinksSchema.safeParse(items);

    if (!parsed.success) return { error: "Invalid data" };

    await LinksService.reorderLinks(profileId, parsed.data);
    revalidatePath("/dashboard");
}
