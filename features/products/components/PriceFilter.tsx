"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { PriceFilterProps } from "../types/product.types"

const PriceFilter = ({ price = [0, 2000], onFilter }: PriceFilterProps) => {
  const [localPrice, setLocalPrice] = React.useState<number[]>(price)

  const handleValueChange = (newValues: number[]) => {
    setLocalPrice(newValues)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full font-jost my-4"
    >
      <h4 className="font-medium text-base mb-6 text-neutral-900">Filter by Price</h4>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-neutral-400 font-light">Price:</span>
          <motion.span
            key={`${localPrice[0]}-${localPrice[1]}`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-sm font-light"
          >
            ${localPrice[0]} — ${localPrice[1]}
          </motion.span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilter?.(localPrice)}
          className="font-bold text-neutral-900 hover:text-red-500 transition-colors uppercase tracking-widest text-[12px] border-b-2 border-transparent hover:border-red-500 pb-0.5"
        >
          Filter
        </motion.button>
      </div>

      <div className="px-1.5 mt-6">
        <Slider
          defaultValue={[0, 2000]}
          max={2000}
          step={10}
          value={localPrice}
          onValueChange={handleValueChange}
          className="mb-8"
        />
      </div>

    </motion.div>
  )
}

export default PriceFilter
