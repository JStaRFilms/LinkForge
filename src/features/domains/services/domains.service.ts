import { prisma } from "@/lib/prisma";
import { CreateDomainInput } from "../schemas";

export const DomainsService = {
    /**
     * Add a new domain to a profile
     */
    async create(data: CreateDomainInput) {
        // Check if domain is already taken
        const existing = await prisma.domain.findUnique({
            where: { domain: data.domain },
        });

        if (existing) {
            throw new Error("Domain is already registered to another profile.");
        }

        return prisma.domain.create({
            data: {
                domain: data.domain,
                profileId: data.profileId,
                verified: false, // For v1, we assume manual verification or middleware check
            },
        });
    },

    /**
     * Delete a domain (ensure ownership)
     */
    async delete(domainId: string, profileId: string) {
        const domain = await prisma.domain.findUnique({
            where: { id: domainId },
        });

        if (!domain) return null;
        if (domain.profileId !== profileId) {
            throw new Error("Unauthorized to delete this domain.");
        }

        return prisma.domain.delete({
            where: { id: domainId },
        });
    },

    /**
     * Get public profile by domain (Used by route handler)
     */
    async getByDomain(domain: string) {
        const domainRecord = await prisma.domain.findUnique({
            where: { domain },
            include: {
                profile: {
                    include: {
                        links: {
                            where: { isEnabled: true },
                            orderBy: { order: "asc" },
                        },
                    },
                },
            },
        });

        if (!domainRecord) return null;
        return domainRecord.profile;
    },

    /**
     * List all domains for a profile
     */
    async list(profileId: string) {
        return prisma.domain.findMany({
            where: { profileId },
            orderBy: { createdAt: "desc" },
        });
    },
};
