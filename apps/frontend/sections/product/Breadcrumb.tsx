import Link from "next/link"

const Breadcrumb = ({ category, tags, name }: {
  category: {
    name: string
  }[], tags: {
    name: string
  }[], name: string
}) => {
  return (
    <div className="flex items-center gap-1 text-xs font-jost flex-wrap">
      <Link href="/" className="text-gray-400 hover:underline">Home</Link>
      <span className="text-gray-400">/</span>
      <Link href={`/shop?category=${category[0].name}`} className="text-gray-400 hover:underline capitalize">
        {category[0].name}
      </Link>
      {tags && tags.length > 0 && <>
        <span className="text-gray-400">/</span>
        <Link href={`/shop?tag=${tags[0].name}`} className="text-gray-400 hover:underline capitalize">
          {tags[0].name}
        </Link>
      </>}
      <span className="text-gray-400">/</span>
      <span className="text-black capitalize">{name}</span>
    </div>
  )
}

export default Breadcrumb