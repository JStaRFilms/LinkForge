import { User, Profile } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type UserWithProfiles = User & { profiles: Profile[] };

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const UserService = {
    /**
     * Ensures a user exists for the given ID. If not, creates a new one.
     * Uses upsert to prevent race conditions.
     * 
     * @param userId - Optional UUID from cookie
     * @returns User with profiles
     * @throws Error if userId is provided but malformed
     */
    async ensureUser(userId?: string): Promise<UserWithProfiles> {
        // If userId provided, validate format
        if (userId !== undefined) {
            if (!UUID_REGEX.test(userId)) {
                throw new Error(`Invalid user ID format: ${userId.substring(0, 20)}...`);
            }

            // Use upsert to handle race conditions atomically
            return prisma.user.upsert({
                where: { id: userId },
                update: {}, // No update needed, just return existing
                create: { id: userId },
                include: { profiles: true },
            });
        }

        // Create new user with auto-generated ID (first visit, no cookie)
        return prisma.user.create({
            data: {},
            include: { profiles: true },
        });
    },

    /**
     * Get a user by ID with their profiles.
     * @param userId - User ID to lookup
     * @returns User with profiles or null if not found
     */
    async getUserById(userId: string): Promise<UserWithProfiles | null> {
        return prisma.user.findUnique({
            where: { id: userId },
            include: { profiles: true }
        });
    }
};


