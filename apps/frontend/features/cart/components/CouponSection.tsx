"use client"

import React, { useState } from 'react'

const CouponSection = () => {
    const [coupon, setCoupon] = useState('')

    return (
        <div className="flex flex-col sm:flex-row gap-0 border mb-6 rounded-sm overflow-hidden h-fit">
            <input 
                type="text" 
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-4 py-3 text-sm outline-none border-r sm:border-r-0"
            />
            <button className="bg-gray-100 px-6 py-3 text-sm font-medium hover:bg-gray-200 transition-colors uppercase whitespace-nowrap">
                Apply coupon
            </button>
        </div>
    )
}

export default CouponSection
