"use client"

import { ProductCardProps } from '@/features/products/types/product.types'
import ProductCard from '@/features/products/components/ProductCard'
import {motion} from "framer-motion"

const RelatedProducts = ({ products }: { products: ProductCardProps[] }) => {
  return (
    <div>
        <p className="font-jost font-medium text-lg pb-4 border-b">Related products</p>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            {products.slice(0,4).map((product) => (
                <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 * products.indexOf(product) }}
                >
                    <ProductCard {...product}/>
                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts