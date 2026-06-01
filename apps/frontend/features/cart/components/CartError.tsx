import { ShoppingBag } from 'lucide-react'
import React from 'react'

const CartError = ({ refetch }: { refetch: () => void }) => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center flex flex-col items-center gap-6">
                <div className="bg-red-50 p-8 rounded-full">
                    <ShoppingBag size={48} className="text-red-400" />
                </div>
                <h1 className="text-3xl font-bold font-jost">Something went wrong</h1>
                <p className="text-gray-500 max-w-md mx-auto">
                    There was an error loading your cart. Please try again.
                </p>
                <button
                    onClick={() => refetch()}
                    className="mt-4 bg-black text-white px-10 py-4 rounded-md font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm"
                >
                    Retry
                </button>
            </div>
        </main>
    )
}

export default CartError