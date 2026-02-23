"use client"

import { ProductCardProps } from '@/features/products/types/product.types'
import DisplaySelector from './DisplaySelector'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUpdateParams } from '@/features/products/hooks/useUpdateParams'
import GridView from './GridView'
import ListView from './ListView'
import { AnimatePresence, motion } from 'framer-motion'

const ProductView = ({ products }: { products: ProductCardProps[] }) => {

  const [display, setDisplay] = useState<'grid' | 'list'>('grid')
  const searchParams = useSearchParams()
  const updateParams = useUpdateParams()

  const limit = searchParams.get('limit') || '16'
  const sort = searchParams.get('sort') || 'latest'

  const handleLimitChange = (value: string) => {
    updateParams({
      limit: value,
    })
  }

  const handleSortChange = (value: string) => {
    updateParams({
      sort: value,
    })
  }

  return (
    <>
      <DisplaySelector
        display={display}
        setDisplay={setDisplay}
        handleLimitChange={handleLimitChange}
        handleSortChange={handleSortChange}
        limit={limit}
        sort={sort}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={display}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {display === 'grid' ? (
            <GridView products={products} />
          ) : (
            <ListView products={products} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default ProductView