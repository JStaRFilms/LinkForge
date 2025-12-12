import { prisma } from "@/lib/prisma";

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
};
