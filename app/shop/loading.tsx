import MorphSkeleton from "@/shared/ui/MorphSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="w-full max-w-7xl mx-auto my-6 xl:my-14 px-3 sm:px-5 xl:px-3">
      <div className="flex items-start gap-20">
        {/* Filters Sidebar Skeleton */}
        <div className="w-full flex-1 min-h-screen hidden xl:block">
          <div className="space-y-8">
            <Skeleton className="h-6 w-1/2 rounded" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
              ))}
            </div>
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="w-full flex-4 grid gap-6">
          <Skeleton className="w-full h-[200px] md:h-[300px] rounded-xl" /> {/* Banner Mask */}
          <MorphSkeleton variant="shopGrid" rows={8} />
        </div>
      </div>
    </main>
  )
}
