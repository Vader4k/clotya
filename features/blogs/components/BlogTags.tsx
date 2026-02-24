import Link from "next/link"

const BlogTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1 font-jost">
      {tags.map((tag) => (
        <Link href={`/blog?tag=${tag}`} key={tag} className="px-3 py-1 border capitalize text-sm">
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default BlogTags