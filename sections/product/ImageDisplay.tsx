"use client"

import Image from "next/image"
import { useState } from "react"

const ImageDisplay = ({ images, name }: { images: string[], name: string }) => {

  const [currentImage, setCurrentImage] = useState(images[0])

  return (
    <div className="w-full h-full grid gap-3">
      <div className="w-full h-screen relative">
        <Image
          src={images[0]}
          alt={name}
          fill
          fetchPriority="high"
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-full flex items-start justify-start gap-3">
        {images.map((image, index) => (
          <button onClick={() => setCurrentImage(image)} key={index} className={`size-20 relative ${currentImage === image ? "border border-gray-600" : ""} rounded overflow-hidden transition`}>
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
    </div>
  )
}

export default ImageDisplay