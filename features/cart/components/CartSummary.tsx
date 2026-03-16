"use client"

import React from 'react'
import { CartItem } from '../types/cart.types'

interface CartSummaryProps {
    items: CartItem[]
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const shipping = 15.00
    const total = subtotal + shipping

    return (
        <div className="border border-gray-100 p-6 rounded-sm">
            <h2 className="text-base font-bold mb-6 border-b pb-3">Cart totals</h2>

            <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-gray-600">Shipment 1</span>
                        <div className="text-right text-xs space-y-2">
                            <label className="flex items-center justify-end gap-2 cursor-pointer">
                                <span>Flat rate: ${shipping.toFixed(2)}</span>
                                <input type="radio" name="shipping" defaultChecked className="accent-blue-600" />
                            </label>
                            <label className="flex items-center justify-end gap-2 cursor-pointer">
                                <span className="text-gray-400">Local pickup</span>
                                <input type="radio" name="shipping" className="accent-blue-600" />
                            </label>
                            <div className="text-gray-500 mt-2">
                                Shipping to <span className="font-bold text-black uppercase">AL</span>.
                            </div>
                            <button className="text-red-400 hover:text-red-500">Change address</button>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-sm">Total</span>
                    <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
            </div>

            <button className="w-full bg-red-500 text-white py-3 text-xs flex items-center justify-center font-medium uppercase tracking-wider mt-8 hover:bg-red-600 transition-colors">
                Proceed to checkout
            </button>
        </div>
    )
}

export default CartSummary
