"use client"

import { Product } from '@/data/products'
import ColorPicker from '@/features/products/components/ColorPicker'
import SizePicker from '@/features/products/components/SizePicker'
import { Star, X, Heart, Share } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuantityPicker from '@/features/products/components/QuantityPicker'
import SizeGuide from './SizeGuide'

const DetailedInformation = ({ product }: { product: Product }) => {

  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [stock, setStock] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)

  const reset = () => {
    setSelectedColor(null)
    setSize(null)
    setQuantity(1)
  }

  const decrease = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    }
  }

  const isDisabled = !selectedColor || !size || stock === 0

  return (
    <div className='font-jost grid gap-4'>
      <h1 className='text-2xl capitalize xl:leading-3'>{product.name}</h1>
      <div className='flex items-center gap-0.5 text-sm'>
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={11} fill='gold' stroke='gold' />
        ))}
        <span className='font-medium px-2'>{product.reviews} reviews</span>
      </div>

      <div>
        {product.discount ? (
          <div className='flex items-center gap-2'>
            <p className='text-xl font-medium line-through text-gray-300'>${product.price}</p>
            <p className='text-xl font-medium'>${product.discount}</p>
          </div>
        ) : (
          <p className='text-xl font-medium'>${product.price}</p>
        )}
      </div>

      <p className='text-sm'>{product.description}</p>


      {product.colors && <div className='mt-2'>
        <ColorPicker
          colors={product.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>}

      <div>
        <SizePicker
          sizes={product.inventory}
          selectedSize={size}
          setSize={setSize}
          setStock={setStock}
        />
      </div>

      <AnimatePresence mode='wait'>
        {selectedColor && size && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => reset()}
            className='flex items-center gap-1 text-sm'
          >
            <X size={16} strokeWidth={3} />
            <p >Clear</p>
          </motion.button>
        )}
      </AnimatePresence>

      <QuantityPicker
        quantity={quantity}
        decrease={decrease}
        increase={increase}
        isDisabled={isDisabled}
      />

      <div className='flex items-center flex-wrap sm:flex-nowrap gap-5 my-2'>
        <SizeGuide />
        <button className='flex items-center gap-1 text-sm'>
          <Heart size={16} strokeWidth={1} />
          <p>Add to wishlist</p>
        </button>
        <button onClick={() => shareProduct()} className='flex items-center gap-1 text-sm'>
          <Share size={16} strokeWidth={1} />
          <p>Share this Product</p>
        </button>
      </div>

        <div className='mt-3 pt-5 w-full border-t'>
            <div className='text-sm grid gap-1.5'>
              <p className='text-gray-400'>SKU: <span className='text-black font-medium'>{product.sku}</span></p>
              <p className='capitalize text-gray-400'>Category: <span className='capitalize text-black font-medium'>{product.category?.map((tag) => tag).join(', ')}</span></p>
              <p className='capitalize text-gray-400'>Tags: <span className='text-black font-medium'>{product.tags?.map((tag) => tag).join(', ')}</span></p>
            </div>
        </div>
    </div>
  )
}

export default DetailedInformation