/**
 * Authentication Helper
 *
 * Centralized auth abstraction for LinkForge.
 * Uses cookie-based user identification with HMAC-signed cookies.
 *
 * TODO: Replace with real auth provider (next-auth, clerk, supabase-auth)
 * When implementing real auth:
 * 1. Install auth provider
 * 2. Replace getCurrentProfile() body with session check
 * 3. All 7+ dependent files will "just work"
 */

import { cache } from "react";
import { cookies } from "next/headers";
import { User, Profile } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyCookie } from "@/lib/cookie-utils";
import { UserService } from "@/features/user/services/user.service";

export interface AuthProfile {
    id: string;
    username: string;
    name: string | null;
    theme: string;
    userId: string;
}

type UserWithProfiles = User & { profiles: Profile[] };

const COOKIE_USER_ID = "linkforge_user_id";
const COOKIE_ACTIVE_PROFILE = "linkforge_active_profile";

/**
 * Get (or create) the current user based on signed cookie.
 * Verifies cookie signature before trusting the user ID.
 */
export const getCurrentUser = cache(async (): Promise<UserWithProfiles> => {
    const cookieStore = await cookies();
    const signedUserId = cookieStore.get(COOKIE_USER_ID)?.value;

    // Verify signature and extract user ID
    const userId = signedUserId ? await verifyCookie(signedUserId) : undefined;

    // ensureUser handles both existing and new users
    return UserService.ensureUser(userId ?? undefined);
});

/**
 * Get the current active profile.
 * - Checks active_profile cookie
 * - Verifies ownership
 * - Fallbacks to primary or first profile
 * - Returns null if no profiles exist (onboarding state)
 */
export const getCurrentProfile = cache(async (): Promise<AuthProfile | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    const cookieStore = await cookies();
    const activeProfileId = cookieStore.get(COOKIE_ACTIVE_PROFILE)?.value;

    const profiles = await prisma.profile.findMany({
        where: { userId: user.id },
    });

    if (profiles.length === 0) return null;

    let activeProfile = profiles.find((p) => p.id === activeProfileId);
    if (!activeProfile) {
        activeProfile = profiles.find((p) => p.isPrimary) || profiles[0];
    }

    // Map to AuthProfile interface
    return {
        id: activeProfile.id,
        username: activeProfile.username,
        name: activeProfile.name,
        theme: activeProfile.theme,
        userId: activeProfile.userId,
    };
});

/**
 * Get just the profile ID for the current user.
 * Useful when you only need the ID for queries.
 */
export async function requireProfileId(): Promise<string> {
    const profile = await getCurrentProfile();
    if (!profile) {
        throw new Error("No active profile found.");
    }
    return profile.id;
}

