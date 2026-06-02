"use client";

import { useMemo } from "react";
import { TrackedOrder } from "../types/tracking.types";
import { useCurrency } from "@/features/currency/context/CurrencyContext";

const TrackedOrderSummary = ({ order }: { order: TrackedOrder }) => {
    const { formatPrice } = useCurrency();

    const formattedDate = useMemo(() => {
        return new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }, [order.createdAt]);

    return (
        <div className="border">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50/50">
                <div>
                    <p className="text-xs text-gray-500">Order Number</p>
                    <p className="font-medium text-sm">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Placed on</p>
                    <p className="font-medium text-sm">{formattedDate}</p>
                </div>
            </div>

            {/* Items */}
            <div className="divide-y">
                {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-16 h-16 bg-gray-100 shrink-0 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium capitalize truncate">
                                {item.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                                {item.size && (
                                    <span className="text-xs text-gray-500">
                                        Size: {item.size}
                                    </span>
                                )}
                                {item.color && (
                                    <span className="text-xs text-gray-500">
                                        Color: {item.color}
                                    </span>
                                )}
                                <span className="text-xs text-gray-500">
                                    Qty: {item.quantity}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm font-medium shrink-0">
                            {formatPrice(item.price)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t bg-gray-50/50">
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <p className="text-gray-500">
                            Shipping to{" "}
                            <span className="text-black font-medium">
                                {[order.shippingAddress.city, order.shippingAddress.state, order.shippingAddress.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-0.5 ${order.isPaid ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                                {order.isPaid ? "Paid" : "Unpaid"}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">
                                {order.shipmentType.replace("_", " ")}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-lg font-medium">{formatPrice(order.totalPrice)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackedOrderSummary;
