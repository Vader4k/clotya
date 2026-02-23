"use client"

import { Checkbox } from '@/components/ui/checkbox'
import { FilterProps } from '../types/product.types'


const CategoryFilter = ({ categories, selectedCategories, setSelectedCategories }: FilterProps) => {
  return (
    <div className='w-full font-jost'>
      <h4 className='font-medium'>Product Categories</h4>

      <div className='my-4 grid gap-2.5'>
        {categories.map((category) => (
          <div onClick={() => setSelectedCategories(category.name)} key={category.id} className='flex items-center gap-3 cursor-pointer'>
            <Checkbox checked={selectedCategories === category.name} />
            <span className='capitalize text-sm text-neutral-800'>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter