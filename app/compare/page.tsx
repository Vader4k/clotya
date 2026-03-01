"use client"

import { useCompareStore } from "@/features/compare/store/compareStore"
import Link from "next/link"
import CompareTable from "@/features/compare/components/CompareTable"

const rows = [
  { label: "Remove" },
  { label: "Image" },
  { label: "Name" },
  { label: "Rating" },
  { label: "Price" },
  { label: "Stock" },
]

const ComparePage = () => {
  const { products, removeProduct } = useCompareStore()

  return (
    <main className="w-full px-4 md:px-8 py-10 xl:py-16 font-jost">
      <h1 className="text-2xl font-semibold mb-8">Compare Products</h1>

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
    </main>
  )
}

export default ComparePage