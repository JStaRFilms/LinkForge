import { z } from "zod";

export const createLinkSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    url: z.string().url("Must be a valid URL"),
    icon: z.string().optional().default("🚀"),
});

export const updateLinkSchema = createLinkSchema.partial().extend({
    id: z.string(),
    isEnabled: z.boolean().optional(),
});

export const reorderLinksSchema = z.array(
    z.object({
        id: z.string(),
        order: z.number(),
    })
);

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
