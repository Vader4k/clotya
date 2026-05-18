"use client"

import { Eye } from 'lucide-react'
import { OrderTableProps } from '../types/order.types'
import { OrderStatusSelect } from './OrderStatusSelect'

export const OrderTable = ({
    orders,
    onSelectOrder,
    onStatusChange,
    isUpdating
}: OrderTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium">Order ID</th>
                        <th scope="col" className="px-6 py-4 font-medium">Customer</th>
                        <th scope="col" className="px-6 py-4 font-medium">Date</th>
                        <th scope="col" className="px-6 py-4 font-medium">Items</th>
                        <th scope="col" className="px-6 py-4 font-medium">Total</th>
                        <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
                        <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                No orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-primary">{order.orderNumber}</td>
                                <td className="px-6 py-4 text-gray-900">
                                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                                    <div className="text-xs text-gray-500">{order.shippingAddress?.email}</div>
                                </td>
                                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{order.items?.length || 0}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">${order.totalPrice?.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <OrderStatusSelect
                                            status={order.status}
                                            orderId={order._id}
                                            onStatusChange={onStatusChange}
                                            disabled={isUpdating}
                                            className="w-[130px]"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex justify-end">
                                    <button 
                                        onClick={() => onSelectOrder(order)}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Eye className="h-4 w-4" />
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
