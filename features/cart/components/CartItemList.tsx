"use client"

import React from 'react'
import { CartItem } from '../types/cart.types'
import Image from 'next/image'
import { XCircle } from 'lucide-react'
import { useRemoveFromCart, useClearCart } from '../hooks/cart.hook'

interface CartItemListProps {
    items: CartItem[]
}

const CartItemList: React.FC<CartItemListProps> = ({ items }) => {
    const { mutate: removeItem, isPending } = useRemoveFromCart()
    const { mutate: clearCart, isPending: isClearing } = useClearCart()

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="border-b text-gray-600 text-xs uppercase tracking-wider">
                        <th className="py-4 font-normal">Product</th>
                        <th className="py-4 font-normal">Price</th>
                        <th className="py-4 font-normal text-center">Quantity</th>
                        <th className="py-4 font-normal text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={`${item.sku}-${index}`} className="border-b last:border-0 group">
                            <td className="py-3 flex items-center gap-1">
                                <button 
                                    onClick={() => removeItem(item._id)}
                                    disabled={isPending}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <XCircle size={18} fill="currentColor" className="text-white fill-red-500" />
                                </button>
                                <div className="relative w-15 h-20 shrink-0 border overflow-hidden">
                                    <Image 
                                        src={item.product.images[0]} 
                                        alt={item.product.name}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-black">
                                        {item.product.name} - {item.size}
                                    </h3>
                                </div>
                            </td>
                            <td className="py-6 text-sm text-gray-600">
                                ${item.product.price.toFixed(2)}
                            </td>
                            <td className="py-6 text-center">
                                <span className="inline-block border px-4 py-2 text-sm">
                                    {item.quantity}
                                </span>
                            </td>
                            <td className="py-6 text-right font-medium text-sm">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="mt-8 flex justify-between items-center">
                 <button 
                    onClick={() => clearCart()}
                    disabled={isClearing}
                    className="text-gray-400 hover:text-black transition-colors text-sm underline uppercase tracking-widest font-medium"
                >
                    {isClearing ? 'Clearing...' : 'Reset cart'}
                </button>
            </div>
        </div>
    )
}

export default CartItemList
