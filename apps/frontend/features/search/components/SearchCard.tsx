import { ProductCardProps } from '@/features/products/types/product.types'
import Image from 'next/image'
import { ProductPrice } from '@/features/currency/components/ProductPrice'

const SearchCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <a href={`/product/${product.slug}`} className='w-full flex items-start justify-between'>
      <div className='flex items-center gap-2'>
        <div className='relative h-14 w-12'>
          <Image src={product.images[0]} alt={product.name} fill className='rounded object-top object-cover' />
        </div>
        <p className='text-sm font-medium capitalize'>{product.name}</p>
      </div>

      <div>
        {product.discountPrice ? (
          <div>
            <ProductPrice price={product.price} className='line-through text-xs text-gray-400 block' />
            <ProductPrice price={product.discountPrice} className='text-sm text-red-600 font-medium block' />
          </div>
        ) : (
          <ProductPrice price={product.price} className='text-sm font-medium block' />
        )}
      </div>
    </a>
  )
}

export default SearchCard