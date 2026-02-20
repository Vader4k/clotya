import { productServices } from "@/features/products/services/product.service";
import ProductCard from "@/features/products/components/ProductCard";
import { BestSellerProps } from "./types/home.types";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Discount from "./Discount";

const BestSeller = async ({ variant }: BestSellerProps) => {

  const bestSellerProducts = await productServices.getBestSeller();


  return (
    <section className='w-full max-w-7xl mx-auto'>
      <div className='w-full flex items-center flex-col justify-center'>
        <h2 className='text-3xl font-jost font-medium'>Best Seller Products</h2>
        <p className='my-4 font-jost text-gray-500 text-center text-balance font-light'>Explore our exclusive collection of premium handpicked products that have been carefully selected just for you to ensure that every single item exceeds your highest expectations in both timeless quality and style</p>
      </div>

      {variant === 'wide' && (
        <>
          <div className="mt-10 flex items-start justify-between gap-6 w-full">
            <div className="w-[45%]">
              <ProductCard {...bestSellerProducts[0]} showRange={true} />
            </div>
            <div className="w-[25%] min-h-156 banner3 font-jost p-14 text-white flex flex-col gap-4 items-start justify-center">
              <span className="font-semibold">Winter 2022 collection</span>
              <h3 className="text-4xl font-medium">Valentin Paul <br />Essential Collection</h3>
              <p className="text-sm text-balance font-inter font-light">Discover the latest trends in fashion with our new collection. Handpicked pieces that combine style, comfort, and quality...</p>
              <Link href={'/shop'} className="mt-4 font-medium flex items-center gap-3">
                Shop Collection <MoveRight />
              </Link>
            </div>
            <div className="w-[45%]">
              <ProductCard {...bestSellerProducts[1]} showRange={true} />
            </div>
          </div>

          <Discount />
        </>
      )}

      {variant === 'close' && (
        <div className="mt-10 flex items-start justify-between gap-6 w-full">
          <div className="w-full max-w-1/2 flex items-start gap-6">
            {bestSellerProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.id} {...product} showRange={true} />
            ))}
          </div>
          <div className="w-full max-w-1/2  min-h-156 banner4 font-jost p-10 text-black flex flex-col gap-4 items-start ">
            <span className="font-semibold">Winter 2022 collection</span>
            <h3 className="text-4xl font-medium">Valentin Paul <br />Essential Collection</h3>
            <p className="text-sm text-balance font-inter font-light">Discover the latest trends in fashion with our new collection. Handpicked pieces that combine style, comfort, and quality...</p>
            <Link href={'/shop'} className="mt-4 font-medium flex items-center gap-3">
              Shop Collection <MoveRight />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default BestSeller