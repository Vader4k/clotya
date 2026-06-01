import BlogTags from '@/features/blogs/components/BlogTags'

const TagsDisplay = ({ tags }: { tags: string[] }) => {
  return (
    <div className='grid gap-6'>
      <h4 className='font-jost font-semibold pb-3 border-b w-full'>Tags</h4>
      <BlogTags tags={tags} />
    </div>
  )
}

export default TagsDisplay