import { User, Profile } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

type UserWithProfiles = User & { profiles: Profile[] };

// Zod schema for UUID validation
const UserIdSchema = z.string().uuid("Invalid user ID format");

export const UserService = {
    /**
     * Ensures a user exists for the given ID. If not, creates a new one.
     * Uses upsert to prevent race conditions.
     *
     * @param userId - Optional UUID from cookie
     * @returns User with profiles
     * @throws ZodError if userId is provided but malformed
     */
    async ensureUser(userId?: string): Promise<UserWithProfiles> {
        // If userId provided, validate format with Zod
        if (userId !== undefined) {
            const validatedId = UserIdSchema.parse(userId);

            // Upsert is atomic - no race condition issues here
            // Note: profiles relation is optional, so create:{} works fine
            return prisma.user.upsert({
                where: { id: validatedId },
                update: {}, // No update needed, just return existing
                create: { id: validatedId },
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
            include: { profiles: true },
        });
    },
};
