import Comments from "@/features/blogs/components/Comments"
import ResponseForm from "@/features/blogs/components/ResponseForm"
import { blogService } from "@/features/blogs/services/blog.service"
import BlogFilters from "@/sections/blog/BlogFilters"
import Lorem from "@/sections/blog/Lorem"
import Image from "next/image"

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params
    const blogPost = await blogService.getBySlug(slug)

    const relatedPosts = await blogService.getRelatedBlogs(blogPost?.slug as string)
    const categories = await blogService.getCategories()
    const tags = await blogService.getTags()

    return (
        <main className="w-full max-w-7xl mx-auto lg:my-14 my-10 flex flex-col lg:flex-row justify-between gap-8 xl:gap-14 relative px-3 md:px-14 lg:px-8 xl:px-3">
            <div className="w-full lg:w-[75%] font-jost grid gap-4">
                <Image
                    src={blogPost?.image as string}
                    alt={blogPost?.title as string}
                    width={1000}
                    height={1000}
                    unoptimized
                    fetchPriority="high"
                    priority
                    className="w-full md:h-[500px] xl:h-[700px] object-cover"
                />
                <div className='w-full flex items-center gap-2'>
                    <p className='text-xs font-semibold text-gray-500'>{blogPost?.categories[0].toUpperCase()}</p>
                    <p className='text-xs text-gray-500'>—</p>
                    <p className='text-xs text-gray-500 capitalize text-nowrap'>{blogPost?.date}</p>
                    <p className='text-xs text-gray-500'>—</p>
                    <div className='w-full flex items-center gap-1'>
                        {blogPost?.tags?.map((tag, index) => (
                            <p key={index} className='text-xs text-black font-medium capitalize'>{tag},</p>
                        ))}
                    </div>
                </div>
                <h1 className="md:text-4xl text-2xl font-medium font-jost">{blogPost?.title}</h1>
                <p className="text-base font-jost text-gray-500">{blogPost?.intro}</p>
                <Lorem />

                {/* comment section */}
                {blogPost?.comments && blogPost?.comments.length > 0 && (
                    <div className='w-full grid gap-4 md:mt-10 mt-4 border-y border-gray-200 py-8'>
                        <h2 className='md:text-lg text-base font-medium font-jost uppercase'>{blogPost?.comments.length} thoughts on {blogPost.title}</h2>
                        <Comments comments={blogPost?.comments} />
                    </div>
                )}

                <ResponseForm />
            </div>
            <aside className="w-full lg:w-[25%] sticky top-5 h-fit pr-5">
                <BlogFilters
                    relatedPosts={relatedPosts}
                    categories={categories}
                    tags={tags}
                />
            </aside>
        </main>
    )
}

export default BlogDetails