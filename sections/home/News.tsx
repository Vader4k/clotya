import { blogService } from "@/features/blogs/services/blog.service"
import BlogCard from "@/features/blogs/components/BlogCard"

const News = async () => {

  const blogData = await blogService.getAll()

  return (
    <section className="2xl:h-screen w-full max-w-7xl mx-auto my-14 py-14 border-y">
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="text-3xl font-medium font-jost">Our Latest News</h3>
        <p className=" font-light text-gray-600 mt-4 max-w-3xl text-sm">
          Explore our curated collection of stories, where fashion meets lifestyle. From expert style guides and
          behind-the-scenes insights to the latest runway trends and industry news, we bring you the inspiration
          you need to define your unique style and stay ahead of the fashion curve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-6 mt-16">
        {blogData.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </section>
  )
}

export default News