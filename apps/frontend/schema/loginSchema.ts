import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").refine((value) => {
        return value.match(/[a-z]/) && value.match(/[A-Z]/);
    }, "Password must contain at least one lowercase letter and one uppercase letter"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;