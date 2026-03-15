"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect } from "react"
import { ImageLightboxProps } from "../types/product.types"


const ImageLightbox = ({ images, currentIndex, setIndex, isOpen, onClose, name }: ImageLightboxProps) => {
  const handleNext = useCallback(() => {
    setIndex((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, setIndex])

  const handlePrev = useCallback(() => {
    setIndex((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, setIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleNext, handlePrev, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 bg-black flex items-center justify-center select-none"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full p-4 md:p-10 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Controls & Indicator */}
            <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between pointer-events-none">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full overflow-hidden border border-white/20">
                <span className="text-white text-sm font-medium tracking-widest uppercase">
                  {currentIndex + 1} <span className="text-white/40 mx-1">/</span> {images.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all pointer-events-auto group"
              >
                <X className="size-6 text-white group-hover:text-black" />
              </button>
            </div>

            {/* Main Expanded Image */}
            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all text-white group"
                >
                  <ChevronLeft className="size-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 size-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all text-white group"
                >
                  <ChevronRight className="size-8" />
                </button>
              </>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageLightbox
