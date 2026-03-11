import * as z from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-0-]+$/, "Slug must be lowercase, numbers and hyphens only"),
    description: z.string().max(200, "Description must be less than 200 characters").optional().or(z.literal("")),
    isActive: z.boolean(),
    tags: z.array(z.string()),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
