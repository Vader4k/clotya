import { ProductCardProps } from '@/features/products/types/product.types'
import ProductCard from '@/features/products/components/ProductCard'

const RelatedProducts = ({ products }: { products: ProductCardProps[] }) => {
  return (
    <div>
        <p className="font-jost font-medium text-lg pb-4 border-b">Related products</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {products.slice(0,4).map((product) => (
                <ProductCard key={product.slug} {...product}/>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts