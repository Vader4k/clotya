import BlogDisplay from '@/sections/blog/BlogDisplay'
import BlogFilters from '@/sections/blog/BlogFilters'
import { blogService } from '@/features/blogs/services/blog.service'

const BlogPage = async() => {
  const blogPosts = await blogService.getAll()
  const relatedPosts = await blogService.getRelatedBlogs(blogPosts[0].slug)
  const categories = await blogService.getCategories()
  const tags = await blogService.getTags()


  return (
    <main className='w-full h-full'>
      <div className='w-full max-w-7xl mx-auto my-14 px-3 flex items-start justify-between gap-14'>
        <div className='w-[75%]'>
          <BlogDisplay blogPosts={blogPosts} />
        </div>
        <aside className='w-[25%] sticky top-5'>
          <BlogFilters relatedPosts={relatedPosts} categories={categories} tags={tags}/>
        </aside>
      </div>
    </main>
  )
}

export default BlogPage