import MorphSkeleton from "@/shared/ui/MorphSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className='w-full h-full'>
      <div className='w-full max-w-7xl mx-auto xl:my-14 my-8 px-3 md:px-14 lg:px-10 xl:px-3 flex flex-col lg:flex-row items-start justify-between xl:gap-14 gap-8'>
        {/* Blog Posts Grid Skeleton */}
        <div className='w-full lg:w-[75%]'>
          <MorphSkeleton variant="blogGrid" rows={6} />
        </div>
        
        {/* Sidebar Filters Skeleton */}
        <aside className='w-full lg:w-[25%] sticky top-5 space-y-8'>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2 rounded" />
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-16 rounded-full" />
                ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2 rounded" />
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <Skeleton className="size-16 rounded" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-full rounded" />
                            <Skeleton className="h-3 w-1/2 rounded" />
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
