import BlogCategories from '@/features/blogs/components/BlogCategories'

const CategoriesDisplay = ({ categories }: { categories: string[] }) => {
  return (
    <div className='grid gap-6'>
      <h4 className='font-jost font-semibold pb-3 border-b w-full'>Categories</h4>
      <BlogCategories categories={categories} />
    </div>
  )
}

export default CategoriesDisplay