import { BlogCardProps } from '../types/blog.types'
import Link from 'next/link'
import Image from 'next/image'

const PopularPostCard = ({ popularPosts }: { popularPosts: BlogCardProps[] }) => {
  return (
    <div className='font-jost grid gap-6'>
      {popularPosts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post._id} className='flex items-center gap-4'>
          <Image src={post.image} alt={post.title} width={100} height={100} className='w-20 h-20 object-cover' />
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-gray-500 tracking-tighter'>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <h4 className='font-medium pr-5 line-clamp-2'>{post.title}</h4>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PopularPostCard