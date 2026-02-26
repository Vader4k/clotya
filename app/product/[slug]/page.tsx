import Breadcrumb from "@/sections/product/Breadcrumb"
import DetailedInformation from "@/sections/product/DetailedInformation"
import ImageDisplay from "@/sections/product/ImageDisplay"
import { productServices } from "@/features/products/services/product.service"
import RecentViews from "@/sections/product/RecentViews"

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const product = await productServices.getBySlug(slug)

  console.log(product)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <main className='w-full max-w-7xl my-14 mx-auto px-3'>
      <div className="w-full flex items-start justify-between gap-20">
        <div className="w-full max-w-[40%]">
          {product.category && product.tags &&
            <Breadcrumb category={product.category} tags={product.tags} />
          }
          <ImageDisplay images={product?.images || []} />
        </div>
        <div className="w-full max-w-[40%]">
          <DetailedInformation product={product} />
        </div>
        {/* recent views */}
        <div className="w-full max-w-[20%]">
            <RecentViews />
        </div>
      </div>

      {/* description, additional information, reviews */}
      <div>

      </div>

      {/* related products */}
      <div>

      </div>
    </main>
  )
}

export default ProductPage