import { prisma } from "@/lib/prisma";
import { CreateLinkInput, UpdateLinkInput } from "../schemas";

export const LinksService = {
    async getLinks(profileId: string) {
        return prisma.link.findMany({
            where: { profileId },
            orderBy: { order: "asc" },
        });
    },

    async createLink(profileId: string, data: CreateLinkInput) {
        // Get max order to append to end
        const lastLink = await prisma.link.findFirst({
            where: { profileId },
            orderBy: { order: "desc" },
        });
        const newOrder = lastLink ? lastLink.order + 1 : 0;

        return prisma.link.create({
            data: {
                ...data,
                order: newOrder,
                profileId,
            },
        });
    },

    async updateLink(profileId: string, { id, ...data }: UpdateLinkInput) {
        return prisma.link.update({
            where: { id, profileId }, // Ensure ownership
            data,
        });
    },

    async toggleLink(profileId: string, id: string) {
        const link = await prisma.link.findUniqueOrThrow({ where: { id, profileId } });
        return prisma.link.update({
            where: { id },
            data: { isEnabled: !link.isEnabled },
        });
    },

    async deleteLink(profileId: string, id: string) {
        return prisma.link.delete({
            where: { id, profileId },
        });
    },

    async reorderLinks(profileId: string, items: { id: string; order: number }[]) {
        // Transaction for safety
        return prisma.$transaction(
            items.map((item) =>
                prisma.link.update({
                    where: { id: item.id, profileId },
                    data: { order: item.order },
                })
            )
        );
    },

    async trackClick(id: string) {
        return prisma.link.update({
            where: { id },
            data: { clicks: { increment: 1 } },
        });
    },
};
