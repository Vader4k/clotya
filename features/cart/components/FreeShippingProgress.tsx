"use client"

import React from 'react'

interface FreeShippingProgressProps {
    total: number
}

const FreeShippingProgress: React.FC<FreeShippingProgressProps> = ({ total }) => {
    const threshold = 250 // Example threshold based on reference image showing $235.01 more for free shipping when total is small
    const remaining = Math.max(0, threshold - total)
    const progress = Math.min(100, (total / threshold) * 100)

    return (
        <div className="bg-white border p-4 mb-6 rounded">
            <div className="text-sm mb-2 text-center">
                {remaining > 0 ? (
                    <>Add <span className="text-red-500 font-bold">${remaining.toFixed(2)}</span> to cart and get free shipping!</>
                ) : (
                    <span className="text-green-600 font-bold">You qualify for free shipping!</span>
                )}
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                    className="bg-red-500 h-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}

export default FreeShippingProgress
