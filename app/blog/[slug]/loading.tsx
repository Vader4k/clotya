import MorphSkeleton from "@/shared/ui/MorphSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="w-full max-w-7xl mx-auto lg:my-14 my-10 flex flex-col lg:flex-row justify-between gap-8 xl:gap-14 px-3 md:px-14 lg:px-8 xl:px-3">
      {/* Blog Detail Content Skeleton */}
      <div className="w-full lg:w-[75%]">
        <MorphSkeleton variant="blogDetails" />
        
        {/* Comments Skeleton Mask */}
        <div className='w-full grid gap-4 md:mt-10 mt-4 border-y border-gray-200 py-8'>
            <Skeleton className="h-6 w-48 rounded" />
            <div className="space-y-6 mt-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <Skeleton className="size-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32 rounded" />
                            <Skeleton className="h-3 w-full rounded" />
                            <Skeleton className="h-3 w-3/4 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Sidebar Mask */}
      <aside className="w-full lg:w-[25%] sticky top-5 h-fit space-y-8">
        <div className="space-y-4">
            <Skeleton className="h-6 w-1/2 rounded" />
            <div className="space-y-4">
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
    </main>
  )
}
