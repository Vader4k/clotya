import { Star } from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { progressValue } from "@/features/products/utils/product.utils"
import { ProductCardProps } from "../types/product.types"


const ProductCard = ({ name, price, images, reviews, discountPrice, discount, inventory, sold, slug, showRange }: ProductCardProps) => {
  return (
    <div className="w-full h-150 lg:h-200 2xl:h-145 flex flex-col justify-between gap-2 relative">
      <Link href={`/product/${slug}`} className="w-full h-[85%] 2xl:h-[80%]">
        <div className="relative w-full h-full">
          <Image src={images[0]} alt={name} fill className="object-cover"sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Link>
      {discount && (
        <div className="absolute top-2 z-5 left-2 bg-white text-xs text-green-600 font-medium font-jost px-2.5 py-1 rounded">
          {discount}%
        </div>
      )}
      <p className="font-jost capitalize">{name}</p>
      <div className="text-sm">
        {discountPrice ? (
          <div className="flex items-center gap-3">
            <p className="font-jost line-through text-gray-300 font-light">${price}</p>
            <p className="font-jost font-medium">${discountPrice}</p>
          </div>
        ) : (
          <p className="font-jost">${price}</p>
        )}
      </div>
      <div className="flex items-center gap-3 my-1">
        <Star size={14} fill="gold" stroke="gold" />
        <p className="text-xs font-semibold">{reviews} review</p>
      </div>
      {inventory && sold && showRange && (
        <div className="font-jost">
          <Progress value={progressValue({ inventory, sold })} />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-400">Available: {inventory.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <p className="text-xs">Sold: <span className="font-medium text-red-600">{sold}</span></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard