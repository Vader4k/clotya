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
      <div className='w-full max-w-7xl mx-auto xl:my-14 my-8 px-3 md:px-14 lg:px-10 xl:px-3 flex flex-col lg:flex-row items-start justify-between xl:gap-14 gap-8'>
        <div className='w-full lg:w-[75%]'>
          <BlogDisplay blogPosts={blogPosts}/>
        </div>
        <aside className='w-full lg:w-[25%] sticky top-5'>
          <BlogFilters relatedPosts={relatedPosts} categories={categories} tags={tags}/>
        </aside>
      </div>
    </main>
  )
}

export default BlogPage