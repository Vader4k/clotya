"use client"

import { useBlogFilters } from "../hooks/useBlogFilters"

const BlogTags = ({ tags }: { tags: string[] }) => {
  const { setFilter, filters } = useBlogFilters();

  return (
    <div className="flex flex-wrap gap-1 font-jost">
      {tags.map((tag) => (
        <button 
          onClick={() => setFilter("tag", filters.tag === tag ? null : tag)} 
          key={tag} 
          className={`px-3 py-1 border capitalize text-sm transition-colors ${filters.tag === tag ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

export default BlogTags