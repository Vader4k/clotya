import * as z from "zod";

export const loginSchema = z.object({
    username: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").refine((value) => {
        return value.match(/[a-z]/) && value.match(/[A-Z]/);
    }, "Password must contain at least one lowercase letter and one uppercase letter"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;