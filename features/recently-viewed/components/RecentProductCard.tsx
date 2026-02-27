import { Product } from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'

const RecentProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.slug}`} className='flex items-center gap-3 font-jost hover:bg-gray-50 p-2 transition-colors'>
      <div className="relative w-12 h-16 overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill className='object-cover object-top' />
      </div>
      <div className="flex-1 grid gap-3">
        <h3 className="text-sm line-clamp-2">{product.name}</h3>
        <div>
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-300 line-through">${product.price}</span>
              <span className="text-xs font-medium">${product.discountPrice}</span>
            </div>
          ) : (
            <span className="text-xs font-medium">${product.price}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RecentProductCard