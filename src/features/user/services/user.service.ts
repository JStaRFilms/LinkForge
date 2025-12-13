import { prisma } from "@/lib/prisma";

export const UserService = {
    /**
     * Ensures a user exists for the given ID. If not, creates a new one.
     * If userId is provided (from cookie), use it as the ID for the new user.
     */
    async ensureUser(userId?: string) {
        if (userId) {
            const existingUser = await prisma.user.findUnique({
                where: { id: userId },
                include: { profiles: true },
            });
            if (existingUser) return existingUser;

            // Create user with the provided ID (from middleware cookie)
            return prisma.user.create({
                data: { id: userId },
                include: { profiles: true },
            });
        }

        // Create new user with auto-generated ID (fallback)
        return prisma.user.create({
            data: {},
            include: { profiles: true },
        });
    },

    async getUserById(userId: string) {
        return prisma.user.findUnique({
            where: { id: userId },
            include: { profiles: true }
        });
    }
};
