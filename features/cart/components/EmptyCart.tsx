import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const EmptyCart = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center flex flex-col items-center gap-6">
                <div className="bg-gray-100 p-8 rounded-full">
                    <ShoppingBag size={48} className="text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold font-jost">Your cart is empty</h1>
                <p className="text-gray-500 max-w-md mx-auto">
                    Looks like you haven&apos;t added anything to your cart yet. Explore our shop and find something you love.
                </p>
                <Link
                    href="/shop"
                    className="mt-4 bg-black text-white px-10 py-4 rounded-md font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm font-jost"
                >
                    Go to Shop
                </Link>
            </div>
        </main>
    )
}

export default EmptyCart