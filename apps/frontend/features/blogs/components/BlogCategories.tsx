"use client"

import { ChevronRight } from "lucide-react"
import { useBlogFilters } from "../hooks/useBlogFilters"

const BlogCategories = ({ categories }: { categories: string[] }) => {
  const { setFilter, filters } = useBlogFilters();

  return (
    <div className='flex flex-col gap-2 font-jost'>
      {categories.map((category) => (
        <button 
          onClick={() => setFilter("category", filters.category === category ? null : category)} 
          key={category} 
          className={`flex items-center gap-2 transition-colors ${filters.category === category ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ChevronRight className="size-4" strokeWidth={1.5}/>
          <p className='text-sm capitalize'>{category}</p>
        </button>
      ))}
    </div>
  )
}

export default BlogCategories