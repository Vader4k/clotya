import { CartItem } from "@/features/cart/types/cart.types";

export type CheckoutItemType = {
    paymentType: string;
    shipmentType: string;
    shippingAddress: {
        firstName: string;
        lastName: string;
        companyName?: string;
        country: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
        email: string;
        notes?: string;
    };
    items: CartItem[];
    cartId: string | null;
}