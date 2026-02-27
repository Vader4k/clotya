
import Image from 'next/image'
import { BlogCardProps } from '../types/blog.types'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'

const BlogCard = ({ categories, intro, slug, title, date, image, tags, blogPage, style }: BlogCardProps) => {
  return (
    <div className={`w-full ${style} relative group overflow-hidden flex flex-col gap-3 items-start justify-between font-jost`}>
      <Link href={`/blog/${slug}`} className={`block w-full h-[85%] lg:h-[70%] relative ${blogPage ? 'h-[90%] lg:h-[90%]' : ''}`}>
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${blogPage ? 'group-hover:scale-none' : ''}`}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </Link>
      <div className='w-full flex items-center gap-2'>
        <p className='text-xs font-semibold text-gray-500'>{categories[0].toUpperCase()}</p>
        <p className='text-xs text-gray-500'>—</p>
        <p className='text-xs text-gray-500 capitalize text-nowrap'>{date}</p>
        {blogPage && (
          <div className='w-full flex items-center gap-1'>
            {tags?.slice(0, 2).map((tag, index) => (
              <p key={index} className='text-xs text-black font-medium capitalize'>{tag}</p>
            ))}
          </div>
        )}
      </div>

      <h4 className={`text-xl font-medium text-gray-900 capitalize line-clamp-1 ${blogPage ? 'line-clamp-none text-4xl lg:text-4xl font-medium' : ''}`}>{title}</h4>
      <p className={`text-sm font-light text-gray-600 xl:line-clamp-2 font-inter ${blogPage ? 'text-lg font-normal' : ''}`}>{intro}</p>
      {blogPage && (
        <Link href={`/blog/${slug}`} className='flex text-lg items-center gap-3 text-gray-600 font-medium'>
          <p>Read More</p>
          <MoveRight size={16} />
        </Link>
      )}
    </div>
  )
}

export default BlogCard