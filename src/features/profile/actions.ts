"use server";

import { LinksService } from "@/features/links/services/links.service";
import { ProfileService } from "@/features/profile/services/profile.service";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createProfileSchema = z.object({
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
    name: z.string().nullish(), // Accepts string, null, or undefined
});

export async function createProfileAction(formData: FormData) {
    const user = await getCurrentUser();
    const cookieStore = await cookies();

    // Ensure user ID is persisted in cookie (first time flow)
    if (!cookieStore.get("linkforge_user_id")?.value) {
        cookieStore.set("linkforge_user_id", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
    }

    // Parse
    const raw = {
        username: formData.get("username"),
        name: formData.get("name"),
    };

    const result = createProfileSchema.safeParse(raw);
    if (!result.success) {
        return { error: result.error.flatten().fieldErrors };
    }

    try {
        const profile = await ProfileService.createProfile(user.id, {
            username: result.data.username,
            name: result.data.name || undefined,
        });

        // Set active profile
        cookieStore.set("linkforge_active_profile", profile.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (e: any) {
        return { error: { username: [e.message] } };
    }
}

export async function switchProfileAction(profileId: string) {
    const user = await getCurrentUser();
    // Verify ownership
    const profile = await ProfileService.getProfileById(profileId);
    if (!profile || profile.userId !== user.id) {
        throw new Error("Unauthorized");
    }

    const cookieStore = await cookies();
    cookieStore.set("linkforge_active_profile", profileId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
    });

    revalidatePath("/dashboard");
}

export async function trackAndRedirectAction(linkId: string, url: string) {
    await LinksService.trackClick(linkId);
    redirect(url);
}

