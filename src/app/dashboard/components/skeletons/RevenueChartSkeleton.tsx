import { Skeleton } from "./Skeleton"

export function RevenueChartSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-lg" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      </div>

      <div className="flex items-end gap-1.5 h-48">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`chart-skeleton-${i}`} className="flex-1 flex flex-col items-center gap-1">
            <Skeleton
              className="w-full rounded-t-sm"
              style={{ height: `${15 + ((i * 17) % 70)}%` }}
            />
            <Skeleton className="h-3 w-6" />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}
