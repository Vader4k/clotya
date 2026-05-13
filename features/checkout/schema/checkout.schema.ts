import z from "zod"

export const billingDetailsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    company: z.string().optional(),
    email: z.string().email(),
    phone: z.string().min(1, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip code is required"),
    notes: z.string().optional(),
    shipmentType: z.enum(["standard", "local_pickup"]),
    paymentType: z.enum(["bank_transfer", "cash_on_delivery"]),
})

export type BillingDetailsType = z.infer<typeof billingDetailsSchema>