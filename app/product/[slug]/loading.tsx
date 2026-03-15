import MorphSkeleton from "@/shared/ui/MorphSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className='w-full max-w-7xl mx-auto px-3 sm:px-10 lg:px-14 xl:px-3 my-10'>
      <div className="mb-8 mt-4">
        <Skeleton className="h-4 w-48 rounded" /> {/* Breadcrumb Mask */}
      </div>
      
      <MorphSkeleton variant="productDetails" />

      {/* Description/Reviews Tabs Mask */}
      <div className="my-14 space-y-4">
        <div className="flex gap-8 border-b border-gray-100 pb-2">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
        </div>
        <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className={`h-4 rounded ${i % 3 === 0 ? 'w-full' : 'w-[90%]'}`} />
            ))}
        </div>
      </div>

      {/* Related Products Mask */}
      <div className="my-14 space-y-6">
        <Skeleton className="h-8 w-48 rounded mx-auto" />
        <MorphSkeleton variant="shopGrid" rows={4} />
      </div>
    </main>
  )
}
