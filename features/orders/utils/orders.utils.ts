import { OrderStatus, PaymentStatus } from "../types/order.types";

export const getStatusStyles = (status: OrderStatus): string => {
    switch (status.toLowerCase()) {
        case 'delivered': return 'bg-green-100 text-green-800'
        case 'processing': return 'bg-blue-100 text-blue-800'
        case 'shipped': return 'bg-purple-100 text-purple-800'
        case 'cancelled': return 'bg-red-100 text-red-800'
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        default: return 'bg-gray-100 text-gray-800'
    }
};

export const getPaymentStatusStyles = (status: PaymentStatus): string => {
    switch (status.toLowerCase()) {
        case 'paid': return 'bg-green-100 text-green-800'
        case 'failed': return 'bg-red-100 text-red-800'
        case 'unpaid': return 'bg-yellow-100 text-yellow-800'
        default: return 'bg-gray-100 text-gray-800'
    }
};
