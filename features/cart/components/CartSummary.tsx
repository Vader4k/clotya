"use client"

import React, {useState} from 'react'
import { CartItem } from '../types/cart.types'
import { useMe } from '@/features/auth/hooks/auth.hooks'
import Link from 'next/link'
import { useCurrency } from '@/features/currency/context/CurrencyContext'

interface CartSummaryProps {
    items: CartItem[]
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
    const { data: user } = useMe()
    const { formatPrice } = useCurrency()
    const [shipping,setShipping] = useState<number>(15.00)
    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );
    const total = subtotal + shipping

    return (
        <div className="border border-gray-100 p-6 rounded-sm">
            <h2 className="text-base font-bold mb-6 border-b pb-3">Cart totals</h2>

            <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-black">{formatPrice(subtotal)}</span>
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm text-gray-600">Shipment</span>
                        <div className="text-right text-xs space-y-2">
                            <label className="flex items-center justify-end gap-2 cursor-pointer">
                                <span>Flat rate: {formatPrice(shipping)}</span>
                                <input type="radio" name="shipping" defaultChecked onChange={() => setShipping(15)} className="accent-blue-600" />
                            </label>
                            <label className="flex items-center justify-end gap-2 cursor-pointer">
                                <span className="text-gray-400">Local pickup</span>
                                <input type="radio" name="shipping" onChange={() => setShipping(0)} className="accent-blue-600" />
                            </label>
                            {user && (
                                <Link href="/account/settings" className="text-red-400 hover:text-red-500 block mt-1">
                                    Change address
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-sm">Total</span>
                    <span className="text-xl font-bold">{formatPrice(total)}</span>
                </div>
            </div>

            <Link href='/checkout' className="w-full bg-red-500 text-white py-3 text-xs flex items-center justify-center font-medium uppercase tracking-wider mt-8 hover:bg-red-600 transition-colors">
                Proceed to checkout
            </Link>
        </div>
    )
}

export default CartSummary
