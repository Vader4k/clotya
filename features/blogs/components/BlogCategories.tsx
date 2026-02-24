import Link from "next/link"
import { ChevronRight } from "lucide-react"

const BlogCategories = ({ categories }: { categories: string[] }) => {
  return (
    <div className='flex flex-col gap-2 font-jost'>
      {categories.map((category) => (
        <Link href={`/blog?category=${category}`} key={category} className='flex items-center gap-2'>
          <ChevronRight className="size-4" strokeWidth={1.5}/>
          <p className='text-sm capitalize'>{category}</p>
        </Link>
      ))}
    </div>
  )
}

export default BlogCategories