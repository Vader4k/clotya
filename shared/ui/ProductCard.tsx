import Image from "next/image"

type ProductCardProps = {
    id: string,
    name: string,
    price: number,
    image1: string,
    image2?: string,
    reviews: number,
    originalPrice: number,
    discountPrice?: number,
    discount?: number,
    isBestSeller: boolean,
    available?: number, //TODO: change to an array of available sizes and calc the number of available sizes
    sold?: number
}

const ProductCard = ({id, name, price, image1, image2, reviews, originalPrice, discountPrice, discount, isBestSeller, available, sold}: ProductCardProps) => {
  return (
    <div className="w-full h-140 flex flex-col gap-3">ProductCard</div>
  )
}

export default ProductCard