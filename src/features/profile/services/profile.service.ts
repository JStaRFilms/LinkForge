import { prisma } from "@/lib/prisma";
import { Profile } from "@prisma/client";

export const ProfileService = {
    async getProfileByUsername(username: string) {
        return prisma.profile.findUnique({
            where: { username },
            include: {
                links: {
                    where: { isEnabled: true },
                    orderBy: { order: "asc" },
                },
            },
        });
    },

    async getProfilesByUserId(userId: string) {
        return prisma.profile.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },

    async createProfile(userId: string, data: { username: string; name?: string; theme?: string }) {
        // Check if username exists
        const existing = await prisma.profile.findUnique({
            where: { username: data.username },
        });
        if (existing) throw new Error("Username already taken");

        // Check if this is the first profile (make it primary)
        const count = await prisma.profile.count({ where: { userId } });
        const isPrimary = count === 0;

        return prisma.profile.create({
            data: {
                ...data,
                userId,
                isPrimary,
            },
        });
    },

    async getProfileById(id: string) {
        return prisma.profile.findUnique({
            where: { id },
            include: {
                links: {
                    orderBy: { order: "asc" },
                },
            },
        });
    }
};

