import { Skeleton } from "@/components/ui/skeleton";

const BAR_HEIGHTS = [45, 60, 38, 75, 55, 80, 50, 65, 42, 70, 58, 90, 48, 62, 72, 40, 85, 53, 67, 78, 44, 59, 88, 36, 63, 74, 56, 82, 47, 69];

const LoadingChart = () => {
  return (
    <div className="mt-8 border border-gray-200 bg-white rounded-xl p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-52" />
        </div>
        <Skeleton className="h-8 w-[140px] rounded-lg" />
      </div>

      {/* Chart body */}
      <div className="flex gap-3">
        {/* Y-axis */}
        <div className="flex flex-col justify-between pb-6 shrink-0">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-2.5 w-8 rounded" />
          ))}
        </div>

        {/* Bars area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-end gap-1 sm:gap-[3px] h-48">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-200 rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          {/* X-axis */}
          <div className="flex justify-between mt-2">
            <Skeleton className="h-2.5 w-12 rounded" />
            <Skeleton className="h-2.5 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingChart;