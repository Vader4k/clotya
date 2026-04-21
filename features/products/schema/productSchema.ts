import * as z from "zod";


export const inventorySchema = z.object({
  size: z.string().min(1, "Size is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  hex: z.string().min(1, "Color hex is required").regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format (e.g. #000000)"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers and hyphens only"),
  sku: z.string().min(1, "SKU is required"),
  
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short Description is required").max(200, "Short description must be less than 200 characters"),
  
  price: z.number().min(0, "Price must be at least 0"),
  discountPrice: z.number().optional(),
  discountPercentage: z.number().optional(),
  
  images: z.array(z.any()).default([]),
  
  isBestSeller: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isDiscount: z.boolean().default(false),
  
  inventory: z.array(inventorySchema).default([]),
  colors: z.array(colorSchema).default([]),
  
  category: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()), // Store tag IDs
});

export type ProductSchemaType = z.input<typeof productSchema>;
