export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface TrackedOrderItem {
    name: string;
    image: string;
    quantity: number;
    size: string;
    color?: string;
    price: number;
}

export interface TrackedShippingAddress {
    firstName: string;
    city: string;
    state: string;
    country: string;
}

export interface TrackedOrder {
    orderNumber: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    items: TrackedOrderItem[];
    shippingAddress: TrackedShippingAddress;
    shipmentType: 'standard' | 'local_pickup';
    totalPrice: number;
    shippingPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
}

export interface TrackingFormData {
    orderNumber: string;
    email: string;
}
