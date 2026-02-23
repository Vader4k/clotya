"use client"

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import ColorFilter from './ColorFilter'
import SizeFilter from './SizeFilter'
import { Category } from '@/data/categories'
import { useUpdateParams } from '@/features/products/hooks/useUpdateParams'

const FiltersPanel = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams()

  const currentPrice = React.useMemo(() => {
    const min = searchParams.get('min_price')
    const max = searchParams.get('max_price')
    return [min ? Number(min) : 0, max ? Number(max) : 2000]
  }, [searchParams])

  const updateParams = useUpdateParams()

  const handlePriceFilter = (newPrice: number[]) => {
    updateParams({
      min_price: newPrice[0].toString(),
      max_price: newPrice[1].toString(),
    })
  }

  const handleCategoryFilter = (category: string) => {
    const current = searchParams.get("category")
    updateParams({
      category: current === category ? null : category,
    })
  }

  const handleColorFilter = (color: string) => {
    const current = searchParams.get("color")
    updateParams({
      color: current === color ? null : color,
    })
  }

  const handleSizeFilter = (size: string) => {
    const current = searchParams.get("size")
    updateParams({
      size: current === size ? null : size,
    })
  }

  return (
    <aside>
      <div className="pb-3">
        <CategoryFilter
          categories={categories}
          selectedCategories={searchParams.get('category') || ''}
          setSelectedCategories={handleCategoryFilter}
        />
      </div>
      <PriceFilter
        price={currentPrice}
        onFilter={handlePriceFilter}
      />
      <div className="pt-8">
        <ColorFilter activeColor={searchParams.get('color') || ''} setActiveColor={handleColorFilter} />
      </div>
      <div className="pt-8">
        <SizeFilter activeSize={searchParams.get('size') || ''} setActiveSize={handleSizeFilter} />
      </div>
    </aside>
  )
}

export default FiltersPanel