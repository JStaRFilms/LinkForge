"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentProfile } from "@/lib/auth";
import { themeKeySchema } from "./schemas";

/**
 * Update the current user's theme.
 * @param theme - Theme key to set (validated with Zod)
 */
export async function updateThemeAction(theme: string) {
    const profile = await getCurrentProfile();

    // Validate theme key with Zod
    const parsed = themeKeySchema.safeParse(theme);
    if (!parsed.success) {
        return { error: "Invalid theme" };
    }

    await prisma.profile.update({
        where: { id: profile.id },
        data: { theme: parsed.data },
    });

    // Dynamic path revalidation based on actual username
    revalidatePath("/dashboard/themes");
    revalidatePath(`/${profile.username}`);
    return { success: true };
}
