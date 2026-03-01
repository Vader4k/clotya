"use client"

import { use } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useProductBySlug } from "@/features/products/services/product.client"
import ImageDisplay from "@/sections/product/ImageDisplay"
import DetailedInformation from "@/sections/product/DetailedInformation"
import { Loader } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const InterceptedProductPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params)
  const router = useRouter()
  const { data: product, isLoading } = useProductBySlug(slug)

  if (isLoading) return <div><Loader className="animate-spin" fill="red" stroke="red" size={24} strokeWidth={2} /></div>
  if (!product) return null

  return (
    <Dialog open={true} onOpenChange={(open) => {
      if (!open) {
        router.back()
      }
    }}>
      <DialogContent className="w-full h-[90vh] overflow-y-auto rounded-none font-jost no-scrollbar py-10">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Quick View</DialogTitle>
            <DialogDescription className="capitalize font-medium text-gray-600">
              {slug}
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className="w-full flex flex-col lg:flex-row items-start gap-5 md:px-5">
          <div className="w-full lg:w-1/2">
            <ImageDisplay images={product?.images || []} name={product?.name || ""} />
          </div>
          <div className="w-full lg:w-1/2">
            <DetailedInformation product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InterceptedProductPage