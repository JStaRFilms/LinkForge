import { z } from "zod";

export const createDomainSchema = z.object({
    domain: z
        .string()
        .min(3, "Domain must be at least 3 characters")
        .max(100, "Domain must be less than 100 characters")
        .regex(
            /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/,
            "Invalid domain format. Do not include http:// or https://. Example: sub.example.com"
        ),
    profileId: z.string().cuid(),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>;
