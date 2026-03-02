import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import StarRating from './StarRating'

const CompareTable = ({ products, removeProduct }: { products: any[], removeProduct: (id: string) => void }) => {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <table className="w-full text-sm border-collapse">
                <tbody>
                    {/* Remove row */}
                    <tr className="border-b">
                        <td className="w-28 min-w-28 px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide border-r bg-gray-50">
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-4 py-3 text-center border-r last:border-r-0 min-w-48">
                                <button
                                    onClick={() => removeProduct(product.id)}
                                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <X size={13} /> Remove
                                </button>
                            </td>
                        ))}
                    </tr>

                    {/* Image row */}
                    <tr className="border-b">
                        <td className="w-28 min-w-28 px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide border-r bg-gray-50">
                            Image
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-4 py-4 border-r last:border-r-0 min-w-60">
                                <Link href={`/product/${product.slug}`}>
                                    <div className="relative w-full aspect-3/4 bg-gray-100 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </Link>
                            </td>
                        ))}
                    </tr>

                    {/* Name row */}
                    <tr className="border-b">
                        <td className="w-28 min-w-28 px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide border-r bg-gray-50">
                            Name
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-4 py-3 border-r last:border-r-0 min-w-48">
                                <Link
                                    href={`/product/${product.slug}`}
                                    className="text-red-500 hover:text-red-700 transition-colors whitespace-normal leading-snug capitalize"
                                >
                                    {product.name}
                                </Link>
                            </td>
                        ))}
                    </tr>

                    {/* Rating row */}
                    <tr className="border-b">
                        <td className="w-28 min-w-28 px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide border-r bg-gray-50">
                            Rating
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-4 py-3 border-r last:border-r-0 min-w-48">
                                <StarRating rating={product.rating} />
                            </td>
                        ))}
                    </tr>

                    {/* Price row */}
                    <tr className="border-b">
                        <td className="w-28 min-w-28 px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide border-r bg-gray-50">
                            Price
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-4 py-3 border-r last:border-r-0 min-w-48">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {product.discountPrice ? (
                                        <>
                                            <span className="line-through text-gray-400 text-xs">${product.price.toFixed(2)}</span>
                                            <span className="font-semibold underline underline-offset-2">
                                                ${product.discountPrice.toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-semibold underline underline-offset-2">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </td>
                        ))}
                    </tr>

                    {/* Stock row */}
                    <tr>
                        <td className="w-28 min-w-28 px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide border-r bg-gray-50">
                            Stock
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-4 py-3 border-r last:border-r-0 min-w-48">
                                <span className="text-green-600 font-medium">In Stock</span>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default CompareTable