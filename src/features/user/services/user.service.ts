import { prisma } from "@/lib/prisma";
import { User, Profile } from "@prisma/client";

type UserWithProfiles = User & { profiles: Profile[] };

export const UserService = {
    /**
     * Ensures a user exists for the given ID. If not, creates a new one.
     * Uses upsert to prevent race conditions.
     * 
     * Security: The userId from cookies is validated as a UUID format before use.
     */
    async ensureUser(userId?: string): Promise<UserWithProfiles> {
        // Validate UUID format to prevent injection
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (userId && uuidRegex.test(userId)) {
            // Use upsert to handle race conditions
            return prisma.user.upsert({
                where: { id: userId },
                update: {}, // No update needed, just return existing
                create: { id: userId },
                include: { profiles: true },
            });
        }

        // Create new user with auto-generated ID (fallback for invalid/missing cookie)
        return prisma.user.create({
            data: {},
            include: { profiles: true },
        });
    },

    async getUserById(userId: string): Promise<UserWithProfiles | null> {
        return prisma.user.findUnique({
            where: { id: userId },
            include: { profiles: true }
        });
    }
};

