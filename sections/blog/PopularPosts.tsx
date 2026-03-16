import PopularPostCard from '@/features/blogs/components/PopularPostCard'
import { BlogCardProps } from '@/features/blogs/types/blog.types'

const PopularPosts = ({ popularPosts }: { popularPosts: BlogCardProps[] }) => {
  return (
    <div className='grid gap-6'>
      <h4 className='font-jost font-semibold pb-3 border-b w-full'>Popular Posts</h4>
      <PopularPostCard popularPosts={popularPosts} />
    </div>
  )
}

export default PopularPosts