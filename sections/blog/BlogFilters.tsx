'use client'

import BlogSearch from '@/features/blogs/components/BlogSearch'
import CategoriesDisplay from '@/sections/blog/CategoriesDisplay'
import PopularPosts from '@/sections/blog/PopularPosts'
import TagsDisplay from '@/sections/blog/TagsDisplay'
import { BlogCardProps } from '@/features/blogs/types/blog.types'
import { usePathname } from 'next/navigation'

const BlogFilters = ({ relatedPosts, categories, tags }: { relatedPosts: BlogCardProps[], categories: string[], tags: string[] }) => {

    const pathname = usePathname()

    return (
        <div className='grid gap-8'>
            <BlogSearch />
            <PopularPosts relatedPosts={relatedPosts} />
            <CategoriesDisplay categories={categories} />
            <TagsDisplay tags={tags} />
        </div>
    )
}

export default BlogFilters