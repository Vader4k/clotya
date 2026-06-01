"use client"

import { Maximize2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import ImageLightbox from "@/features/products/components/ImageLightbox"

const ImageDisplay = ({ images, name }: { images: string[], name: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEnlarged, setIsEnlarged] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const currentImage = images[currentImageIndex]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePos({ x, y })
  }

  return (
    <div className="w-full h-full grid gap-3">
      {/* Main Image View */}
      <div
        className="w-full h-150 sm:h-screen 2xl:h-200 relative group overflow-hidden cursor-zoom-in bg-gray-50"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsEnlarged(true)}
      >
        <Image
          src={currentImage}
          alt={name}
          fill
          fetchPriority="high"
          unoptimized
          className={`w-full h-full object-cover transition-transform duration-300 ease-out ${isHovering ? "scale-150" : "scale-100"}`}
          style={{
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`
          }}
        />

        {/* Enlarge Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsEnlarged(true)
          }}
          className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95"
          title="Enlarge Image"
        >
          <Maximize2 className="size-5 text-black" />
        </button>
      </div>

      <div className="w-full h-full flex items-start justify-start gap-3">
        {images.map((image, index) => (
          <button onClick={() => setCurrentImageIndex(index)} key={index} className={`size-20 relative ${currentImageIndex === index ? "border border-gray-600" : ""} rounded overflow-hidden transition`}>
            <Image
              src={image}
              alt={name}
              fill
              fetchPriority="high"
              unoptimized
              className="w-full h-full object-cover object-top p-1"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <ImageLightbox
        images={images}
        currentIndex={currentImageIndex}
        setIndex={setCurrentImageIndex}
        isOpen={isEnlarged}
        onClose={() => setIsEnlarged(false)}
        name={name}
      />
    </div>
  )
}

export default ImageDisplay