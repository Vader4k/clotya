import { ProductCardProps } from '@/features/products/types/product.types'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

const ListView = ({ products }: { products: ProductCardProps[] }) => {
    return (
        <div className="flex flex-col gap-8">
            {products.map((product) => (
                <div key={product.slug} className="group flex flex-col md:flex-row gap-6 border-b pb-8">
                    <Link href={`/product/${product.slug}`} className="relative w-full md:w-64 h-80 shrink-0 overflow-hidden">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 256px"
                        />
                        {product.images[1] && <Image src={product.images[1]} alt={product.name} fill className="object-cover object-top absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:z-2" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />}
                    </Link>
                    <div className="flex flex-col justify-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < 4 ? "gold" : "transparent"} stroke="gold" />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.reviews} Reviews)</span>
                        </div>
                        <Link href={`/product/${product.slug}`}>
                            <h3 className="text-xl font-jost capitalize hover:text-gray-600 transition-colors">{product.name}</h3>
                        </Link>
                        <div className="text-lg">
                            {product.discountPrice ? (
                                <div className="flex items-center gap-3">
                                    <p className="font-jost line-through text-gray-300 font-light">${product.price}</p>
                                    <p className="font-jost font-medium text-red-600">${product.discountPrice}</p>
                                </div>
                            ) : (
                                <p className="font-jost">${product.price}</p>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 font-jost max-w-2xl line-clamp-2">
                            {product.description}
                        </p>
                        <Link
                            href={`/product/${product.slug}`}
                            className="mt-2 w-fit px-6 py-2 border border-black text-sm font-jost hover:bg-black hover:text-white transition-all uppercase tracking-widest"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListView