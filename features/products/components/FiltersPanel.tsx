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
    router.push(`/shop?${params.toString()}`)
  }

  const handleCategoryFilter = (category: string) => {
    if (searchParams.get('category') === category) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('category')
      router.push(`/shop?${params.toString()}`)
      return
    }
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', category)
    router.push(`/shop?${params.toString()}`, {scroll: false})
  }

  const handleColorFilter = (color: string) => {
    if (searchParams.get('color') === color) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('color')
      router.push(`/shop?${params.toString()}`, {scroll: false})
      return
    }
    const params = new URLSearchParams(searchParams.toString())
    params.set('color', color)
    router.push(`/shop?${params.toString()}`, {scroll: false})
  }

  const handleSizeFilter = (size: string) => {
    if (searchParams.get('size') === size) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('size')
      router.push(`/shop?${params.toString()}`, {scroll: false})
      return
    }
    const params = new URLSearchParams(searchParams.toString())
    params.set('size', size)
    router.push(`/shop?${params.toString()}`, {scroll: false})
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