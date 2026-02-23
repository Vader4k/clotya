import { ProductCardProps } from '@/features/products/types/product.types'
import ProductCard from '@/features/products/components/ProductCard'

const GridView = ({ products }: { products: ProductCardProps[] }) => {
    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((product) => (
                <ProductCard key={product.slug} {...product} showRange={false} />
            ))}
        </div>
    )
}

export default GridView