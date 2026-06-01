import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  image: z.string().url("Please enter a valid image URL"),
  intro: z.string().min(10, "Intro must be at least 10 characters long").max(300, "Intro must be less than 300 characters"),
  details: z.string().min(20, "Blog content must be at least 20 characters long"),
});

export type BlogSchemaType = z.infer<typeof blogSchema>;
