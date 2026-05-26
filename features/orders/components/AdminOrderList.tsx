"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetAdminOrders, useUpdateOrderStatus } from '../hooks/order.hooks'
import { Order, OrderStatus } from '../types/order.types'
import { OrderTable } from './OrderTable'
import { OrderSheet } from './OrderSheet'
import { OrderLoading, OrderError, OrderEmpty } from './OrderStates'
import { toast } from 'sonner'

export const AdminOrderList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const { data: orders, isLoading, isError, refetch } = useGetAdminOrders()
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus()

    const filteredOrders = orders?.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order.shippingAddress?.firstName} ${order.shippingAddress?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress?.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const openOrderDetails = (order: Order) => {
        setSelectedOrder(order)
        setIsSheetOpen(true)
    }

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        updateStatus({ orderId, status: newStatus }, {
            onSuccess: () => {
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null)
                    toast.success("Order status updated")
                }
            }
        })
    }

    if (isLoading) {
        return <OrderLoading />
    }

    if (isError) {
        return <OrderError onRetry={() => refetch()} />
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
                    <p className="text-gray-500">Track and manage customer orders.</p>
                </div>
            </div>

            <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 p-4 flex justify-between items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search orders by ID, name, or email..."
                            className="pl-9 border-gray-200 focus-visible:ring-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <OrderEmpty
                        hasSearch={searchTerm.length > 0}
                        onReset={() => setSearchTerm('')}
                    />
                ) : (
                    <OrderTable
                        orders={filteredOrders}
                        onSelectOrder={openOrderDetails}
                        onStatusChange={handleStatusChange}
                        isUpdating={isUpdating}
                    />
                )}
            </div>

            <OrderSheet
                order={selectedOrder}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                onStatusChange={handleStatusChange}
                isUpdating={isUpdating}
            />
        </div>
    )
}
