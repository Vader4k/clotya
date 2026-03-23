import * as z from "zod";

export const userLoginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});
export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type UserRegisterSchemaType = z.infer<typeof userRegisterSchema>;

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});
export type ProfileSchemaType = z.infer<typeof profileSchema>;

export const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your new password")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});
export type PasswordSchemaType = z.infer<typeof passwordSchema>;

export const addressSchema = z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State/Province is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
});
export type AddressSchemaType = z.infer<typeof addressSchema>;
