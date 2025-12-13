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

import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { UserService } from "@/features/user/services/user.service";

export interface AuthProfile {
    id: string;
    username: string;
    name: string | null;
    theme: string;
    userId: string;
}

const COOKIE_USER_ID = "linkforge_user_id";
const COOKIE_ACTIVE_PROFILE = "linkforge_active_profile";

/**
 * Get (or create) the current user based on cookie.
 */
export const getCurrentUser = cache(async () => {
    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_USER_ID)?.value;

    const user = await UserService.ensureUser(userId);

    // If we created a new user or recovered one, ensure cookie is set
    // Note: In Server Components, we can't set cookies easily without Middleware or Server Action.
    // Ideally this happens in Middleware. For now, we'll rely on the fact that if we just created it, the UI will need to set it?
    // Actually, ensureUser returns the user. If ID changed, we need to set it.
    // Limitation: RSC cannot Set-Cookie. We will handle cookie setting in the specialized "init" flow or Actions.
    // But for now, let's assume if it's missing, we might need a client interaction or Middleware to persist it.
    // Strategy: We'll read it here. If missing, we'll return a new User, but the client won't know ID until we pass it.

    return user;
});

/**
 * Get the current active profile.
 * - Checks active_profile cookie
 * - Verifies ownership
 * - Fallbacks to first profile
 * - Returns null if no profiles exist (onboarding state)
 */
export const getCurrentProfile = cache(async (): Promise<AuthProfile | null> => {
    const user = await getCurrentUser();
    if (!user) return null; // Should not happen with ensureUser

    const cookieStore = await cookies();
    const activeProfileId = cookieStore.get(COOKIE_ACTIVE_PROFILE)?.value;

    const profiles = await prisma.profile.findMany({
        where: { userId: user.id },
    });

    if (profiles.length === 0) return null;

    let activeProfile = profiles.find((p) => p.id === activeProfileId);
    if (!activeProfile) {
        // Fallback to primary or first
        activeProfile = profiles.find((p) => p.isPrimary) || profiles[0];
    }

    return activeProfile;
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
