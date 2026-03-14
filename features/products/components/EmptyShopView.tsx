import { SearchX } from 'lucide-react'
import Link from 'next/link'

const EmptyShopView = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-700'>
      <div className='mb-6 p-3 rounded-full bg-gray-50 text-gray-300'>
        <SearchX size={34} strokeWidth={1} />
      </div>

      <h3 className='text-xl font-medium text-neutral-900 font-jost mb-2'>
        No products found
      </h3>

      <p className='text-sm text-gray-500 font-jost max-w-xs mx-auto mb-8'>
        We couldn't find any products matching your current filters. Try adjusting your selection or clearing all filters.
      </p>

      <Link 
        href="/shop" 
        className='px-8 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all active:scale-95 font-jost'
      >
        Clear All Filters
      </Link>
    </div>
  )
}

export default EmptyShopView