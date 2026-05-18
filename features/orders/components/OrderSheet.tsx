"use client"

import { Package, CreditCard, User, MapPin } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { OrderSheetProps } from '../types/order.types'
import { getStatusStyles, getPaymentStatusStyles } from '../utils/orders.utils'
import { OrderStatusSelect } from './OrderStatusSelect'

export const OrderSheet = ({
    order,
    open,
    onOpenChange,
    onStatusChange,
    isUpdating
}: OrderSheetProps) => {
    if (!order) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-xl overflow-y-auto px-6">
                <SheetHeader className="px-0">
                    <SheetTitle className="flex items-center justify-between">
                        <span>Order Details</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyles(order.status)}`}>
                            {order.status.toUpperCase()}
                        </span>
                    </SheetTitle>
                    <SheetDescription>
                        Order ID: {order.orderNumber}
                        <br />
                        Placed on: {new Date(order.createdAt).toLocaleString()}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-8 pb-12">
                    {/* Actions / Status Update */}
                    <div className="p-4 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Update Status</span>
                        <OrderStatusSelect
                            status={order.status}
                            orderId={order._id}
                            onStatusChange={onStatusChange}
                            disabled={isUpdating}
                            className="w-[180px] bg-white border border-gray-200"
                            showBadgeStyle={false}
                        />
                    </div>

                    {/* Customer & Shipping Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
                                <User className="h-4 w-4 text-gray-500" />
                                Customer Info
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p className="font-medium text-gray-900">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                                <p>{order.shippingAddress?.email}</p>
                                <p>{order.shippingAddress?.phone}</p>
                                {order.shippingAddress?.companyName && (
                                    <p className="text-gray-500">Company: {order.shippingAddress.companyName}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                Shipping Address
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shippingAddress?.address}</p>
                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
                                <p>{order.shippingAddress?.country}</p>
                                <p className="mt-2 text-xs">
                                    <span className="font-medium">Type:</span> {order.shipmentType.replace('_', ' ')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            Payment Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Method</p>
                                <p className="font-medium capitalize">{order.paymentType.replace('_', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${getPaymentStatusStyles(order.paymentStatus)}`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                            {order.paymentResult?.reference && (
                                <div className="col-span-2 mt-2 pt-2 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Reference ID</p>
                                    <p className="font-mono text-xs break-all">{order.paymentResult.reference}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
                            <Package className="h-4 w-4 text-gray-500" />
                            Order Items ({order.items?.length || 0})
                        </h3>
                        <div className="space-y-3">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-3 bg-white border border-gray-200 rounded-lg">
                                    <div className="h-16 w-16 relative rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <Package className="h-6 w-6 m-auto text-gray-300 absolute inset-0" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mt-1">
                                            <span>Qty: {item.quantity}</span>
                                            <span>Size: {item.size}</span>
                                            {item.color && <span>Color: {item.color}</span>}
                                            <span className="font-mono text-[10px]">SKU: {item.sku}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border border-gray-200">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${order.itemsPrice?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>${order.shippingPrice?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>${order.taxPrice?.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-semibold text-gray-900 text-base">
                                <span>Total</span>
                                <span>${order.totalPrice?.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {order.shippingAddress?.notes && (
                        <div className="space-y-2 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900">Customer Notes</h3>
                            <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
                                {order.shippingAddress.notes}
                            </p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
