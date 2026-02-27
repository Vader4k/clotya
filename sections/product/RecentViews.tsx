"use client"

import { useGetRecentlyViewedIds } from "@/features/recently-viewed/hooks/useGetRecentViewsId"
import { useGetRecentProducts } from "@/features/recently-viewed/hooks/useGetRecentProducts"
import RecentProductCard from "@/features/recently-viewed/components/RecentProductCard"
import {motion} from "framer-motion"

const RecentViews = ({currentProductId}: {currentProductId: string}) => {
  const ids = useGetRecentlyViewedIds()
  const { data: recentProducts } = useGetRecentProducts(ids)

  const filteredProducts = recentProducts?.filter(product => product.id !== currentProductId)

  if (!filteredProducts?.length) return null

  return (
    <div className='font-jost'>
      <h2 className="mb-4 font-medium">Recent Views</h2>
      <div className="flex flex-col gap-1 mt-2">
        {filteredProducts.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * filteredProducts.indexOf(product) }}
          >
            <RecentProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RecentViews