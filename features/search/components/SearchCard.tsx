import { ProductCardProps } from '@/features/products/types/product.types'
import Image from 'next/image'
import Link from 'next/link'

const SearchCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <Link href={`/product/${product.slug}`} className='w-full flex items-start justify-between'>
      <div className='flex items-center gap-2'>
        <div className='relative h-14 w-12'>
          <Image src={product.images[0]} alt={product.name} fill className='rounded object-top object-cover' />
        </div>
        <p className='text-sm font-medium capitalize'>{product.name}</p>
      </div>

      <div>
        {product.discountPrice ? (
          <div>
            <p className='line-through text-xs text-gray-400'>${product.price}</p>
            <p className='text-sm text-red-600 font-medium'>${product.discountPrice}</p>
          </div>
        ) : (
          <p className='text-sm font-medium'>${product.price}</p>
        )}
      </div>
    </Link>
  )
}

export default SearchCard