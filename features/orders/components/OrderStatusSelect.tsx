"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { OrderStatus, OrderStatusSelectProps } from "../types/order.types"
import { getStatusStyles } from "../utils/orders.utils"

export const OrderStatusSelect = ({
    status,
    orderId,
    onStatusChange,
    disabled,
    className = "",
    showBadgeStyle = true
}: OrderStatusSelectProps) => {
    return (
        <Select
            value={status}
            onValueChange={(val) => onStatusChange(orderId, val as OrderStatus)}
            disabled={disabled}
        >
            <SelectTrigger className={`h-8 border-0 focus:ring-0 focus:ring-offset-0 ${showBadgeStyle ? getStatusStyles(status) : 'bg-white border border-gray-200'} ${className}`}>
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
        </Select>
    )
}
