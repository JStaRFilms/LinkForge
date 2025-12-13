/**
 * Authentication Helper
 *
 * Centralized auth abstraction for LinkForge.
 * Currently uses seed profile as placeholder.
 *
 * TODO: Replace with real auth provider (next-auth, clerk, supabase-auth)
 * When implementing real auth:
 * 1. Install auth provider
 * 2. Replace getCurrentProfile() body with session check
 * 3. All 7+ dependent files will "just work"
 */

import { prisma } from "@/lib/prisma";

export interface AuthProfile {
    id: string;
    username: string;
    name: string | null;
    theme: string;
}

/**
 * Get the current authenticated user's profile.
 * Throws if not authenticated or profile doesn't exist.
 */
export async function getCurrentProfile(): Promise<AuthProfile> {
    // TODO: Replace with real auth
    // const session = await auth();
    // if (!session?.user) throw new Error("Not authenticated");
    // return prisma.profile.findUniqueOrThrow({ where: { userId: session.user.id } });

    const profile = await prisma.profile.findFirst({
        where: { username: "johndoe" },
        select: { id: true, username: true, name: true, theme: true },
    });

    if (!profile) {
        throw new Error(
            "Profile not found. Run `npx prisma db seed` to create the demo profile."
        );
    }

    return profile;
}

/**
 * Get just the profile ID for the current user.
 * Useful when you only need the ID for queries.
 */
export async function requireProfileId(): Promise<string> {
    const profile = await getCurrentProfile();
    return profile.id;
}
