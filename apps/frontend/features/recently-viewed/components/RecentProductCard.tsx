import { ProductCardProps } from '@/features/products/types/product.types'
import Image from 'next/image'
import { ProductPrice } from '@/features/currency/components/ProductPrice'

const RecentProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <a href={`/product/${product.slug}`} className='flex items-center gap-3 font-jost hover:bg-gray-50 p-2 transition-colors'>
      <div className="relative w-12 h-16 overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill className='object-cover object-top' />
      </div>
      <div className="flex-1 grid gap-3">
        <h3 className="text-sm line-clamp-2 capitalize">{product.name}</h3>
        <div>
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <ProductPrice price={product.price} className="text-xs text-gray-300 line-through" />
              <ProductPrice price={product.discountPrice} className="text-xs font-medium" />
            </div>
          ) : (
            <ProductPrice price={product.price} className="text-xs font-medium" />
          )}
        </div>
      </div>
    </a>
  )
}

export default RecentProductCard