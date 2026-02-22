
import Image from 'next/image'
import { BlogCardProps } from '../types/blog.types'
import Link from 'next/link'

const BlogCard = ({ categories, intro, slug, title, date, image }: BlogCardProps) => {
  return (
    <div className='w-full h-[430px] relative group overflow-hidden flex flex-col items-start justify-between font-jost'>
      <Link href={`/blogs/${slug}`} className='block w-full h-[70%] relative'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </Link>
      <div className='w-full flex items-center gap-2'>
        <p className='text-xs font-semibold text-gray-500'>{categories[0].toUpperCase()}</p>
        <p className='text-xs text-gray-500'>—</p>
        <p className='text-xs text-gray-500 capitalize'>{date}</p>
      </div>

      <h4 className='text-xl font-semibold text-gray-900 capitalize line-clamp-1'>{title}</h4>
      <p className='text-sm font-light text-gray-600 line-clamp-2 font-inter'>{intro}</p>
    </div>
  )
}

export default BlogCard