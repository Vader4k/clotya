"use client";

import { useEffect, useState } from "react";
import { accountClientService, Order } from "../services/account.client.service";
import { Loader2, PackageOpen } from "lucide-react";
import Link from "next/link";

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await accountClientService.getOrders();
            setOrders(data);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="size-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 border border-neutral-200">
                <PackageOpen className="size-12 text-neutral-300 mb-4" />
                <h3 className="text-lg font-medium text-black">No orders yet</h3>
                <p className="text-sm text-neutral-500 mt-1 mb-6">Looks like you haven't made any purchases yet.</p>
                <Link 
                    href="/shop"
                    className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-neutral-200 bg-white">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
                    <tr>
                        <th className="px-6 py-4 font-medium">Order ID</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Total</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-black">{order.id}</td>
                            <td className="px-6 py-4 text-neutral-600">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-800`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-neutral-600">${order.total.toFixed(2)} for {order.items} item{order.items > 1 ? 's' : ''}</td>
                            <td className="px-6 py-4">
                                <button className="text-black font-medium hover:underline underline-offset-4">
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
