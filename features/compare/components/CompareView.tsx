"use client"

import { useCompareStore } from "@/features/compare/store/compareStore"
import Link from "next/link"
import CompareTable from "@/features/compare/components/CompareTable"

const CompareView = () => {
    const { products, removeProduct } = useCompareStore()

    return (
        <div className="w-full">
            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
                    <p className="text-lg">No products to compare.</p>
                    <Link href="/shop" className="text-sm underline underline-offset-4 hover:text-black transition-colors">
                        Browse products
                    </Link>
                </div>
            ) : (
                <CompareTable products={products} removeProduct={removeProduct} />
            )}
        </div>
    )
}

export default CompareView
