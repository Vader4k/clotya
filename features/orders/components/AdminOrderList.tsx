"use client"

import { useState } from 'react'
import { Eye, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Dummy Data
const INITIAL_ORDERS = [
    { id: "ORD-7392", customer: "Sarah Jenkins", date: "Oct 24, 2026", total: 129.99, status: "Delivered", items: 2 },
    { id: "ORD-7393", customer: "Michael Chen", date: "Oct 24, 2026", total: 45.00, status: "Processing", items: 1 },
    { id: "ORD-7394", customer: "Emma Wilson", date: "Oct 23, 2026", total: 349.50, status: "Shipped", items: 4 },
    { id: "ORD-7395", customer: "David Miller", date: "Oct 22, 2026", total: 89.99, status: "Cancelled", items: 1 },
    { id: "ORD-7396", customer: "Sophia Taylor", date: "Oct 21, 2026", total: 210.25, status: "Delivered", items: 3 },
]

export const AdminOrderList = () => {
    const [orders, setOrders] = useState(INITIAL_ORDERS)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800'
            case 'Processing': return 'bg-blue-100 text-blue-800'
            case 'Shipped': return 'bg-purple-100 text-purple-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
                    <p className="text-gray-500">Track and manage customer orders.</p>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 p-4 flex justify-between items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search orders by ID or customer..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">{order.items}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            <Eye className="h-4 w-4" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
