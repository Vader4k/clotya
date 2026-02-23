"use client"

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import ColorFilter from './ColorFilter'
import SizeFilter from './SizeFilter'
import { Category } from '@/data/categories'

const FiltersPanel = ({ categories }: { categories: Category[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPrice = React.useMemo(() => {
    const min = searchParams.get('min_price')
    const max = searchParams.get('max_price')
    return [min ? Number(min) : 0, max ? Number(max) : 2000]
  }, [searchParams])

  const handlePriceFilter = (newPrice: number[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('min_price', newPrice[0].toString())
    params.set('max_price', newPrice[1].toString())
    router.push(`/shop?${params.toString()}`, { scroll: false })
  }

  return (
    <aside>
      <div className="pb-3">
        <CategoryFilter
          categories={categories}
          selectedCategories={searchParams.get('category') || ''}
          setSelectedCategories={(cat) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('category', cat)
            router.push(`/shop?${params.toString()}`, { scroll: false })
          }}
        />
      </div>
      <PriceFilter
        price={currentPrice}
        onFilter={handlePriceFilter}
      />
      <div className="pt-8">
        <ColorFilter />
      </div>
      <div className="pt-8">
        <SizeFilter />
      </div>
    </aside>
  )
}

export default FiltersPanel