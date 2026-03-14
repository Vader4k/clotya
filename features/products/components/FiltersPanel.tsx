"use client"

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import ColorFilter from './ColorFilter'
import SizeFilter from './SizeFilter'
import { Category } from "@/features/categories/types/categories.types";
import { useUpdateParams } from '@/features/products/hooks/useUpdateParams'

const FiltersPanel = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams()

  const currentPrice = React.useMemo(() => {
    const min = searchParams.get('minPrice')
    const max = searchParams.get('maxPrice')
    return [min ? Number(min) : 0, max ? Number(max) : 2000]
  }, [searchParams])

  const updateParams = useUpdateParams()

  const handlePriceFilter = (newPrice: number[]) => {
    updateParams({
      minPrice: newPrice[0].toString(),
      maxPrice: newPrice[1].toString(),
    })
  }

  const handleCategoryFilter = (category: string) => {
    const current = searchParams.get("category")?.toLowerCase()
    updateParams({
      category: current === category ? null : category,
    })
  }

  const handleColorFilter = (color: string) => {
    const current = searchParams.get("colors")
    updateParams({
      colors: current === color ? null : color,
    })
  }

  const handleSizeFilter = (size: string) => {
    const current = searchParams.get("sizes")
    updateParams({
      sizes: current === size ? null : size,
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
        <ColorFilter activeColor={searchParams.get('colors') || ''} setActiveColor={handleColorFilter} />
      </div>
      <div className="pt-8">
        <SizeFilter activeSize={searchParams.get('sizes') || ''} setActiveSize={handleSizeFilter} />
      </div>
    </aside>
  )
}

export default FiltersPanel