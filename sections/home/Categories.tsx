"use client"

import CategoriesTab from "@/features/categories/components/CategoriesTab";
import { useGetProductsByCategory } from "@/features/products/hooks/useProducts";
import { useState, useRef, useEffect } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PRODUCT_CATEGORIES = [
  "men",
  "women",
  "outerwear",
]

const Categories = () => {
  const [selected, setSelected] = useState(PRODUCT_CATEGORIES[0])
  const swiperRef = useRef<SwiperType>(null);

  const { data: products, isLoading, isError } = useGetProductsByCategory(selected)

  const isEmpty = products?.length === 0

  useEffect(() => {
    swiperRef.current?.slideTo(0);
  }, [selected])


  return (
    <section className="w-full max-w-7xl mx-auto mt-14 overflow-x-hidden">
      <div className="w-full">
        <CategoriesTab selected={selected} setSelected={setSelected} categories={PRODUCT_CATEGORIES} />
      </div>

      <div className="my-12 relative swiper-container-custom min-w-0">
        <div className="w-full min-w-0">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              360: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            className="products-swiper"
          >
            {products?.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="pb-4">
                  <ProductCard {...product} showRange={false} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Pagination Container */}
        <div className="custom-pagination mt-6 flex items-center justify-center gap-3"></div>

        <style jsx global>{`
          .custom-pagination .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #d1d5db;
            opacity: 1;
            border-radius: 9999px;
            transition: all 0.3s ease;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background: #000;
            width: 24px;
          }
        `}</style>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-30">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-30 font-jost">
            <p className="text-red-500">Error fetching products</p>
          </div>
        )}

        {!isLoading && isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-30 font-jost">
            <p className="text-red-500">No products found for this category at this time</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Categories