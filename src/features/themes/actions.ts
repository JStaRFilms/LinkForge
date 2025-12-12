"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ThemeKey, THEMES } from "./themes";

async function getProfileId() {
    const profile = await prisma.profile.findFirst({ where: { username: "johndoe" } });
    if (!profile) throw new Error("Profile not found");
    return profile.id;
}

export async function updateThemeAction(theme: string) {
    const profileId = await getProfileId();

    // Validate theme key
    if (!Object.keys(THEMES).includes(theme)) {
        return { error: "Invalid theme" };
    }

    await prisma.profile.update({
        where: { id: profileId },
        data: { theme },
    });

    revalidatePath("/dashboard/themes");
    revalidatePath("/johndoe"); // Revalidate public profile
    return { success: true };
}
