import BlogCard from "@/features/blogs/components/BlogCard"
import { BlogCardProps } from "@/features/blogs/types/blog.types"

const BlogDisplay = ({ blogPosts }: { blogPosts: BlogCardProps[] }) => {
  return (
    <div className="grid gap-16">
        {blogPosts.map((blogPost) => (
            <BlogCard key={blogPost.id} {...blogPost} blogPage style="min-h-[480px] md:min-h-160 lg:min-h-180 xl:min-h-210"/>
        ))}
    </div>
  )
}

export default BlogDisplay