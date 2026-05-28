import { Skeleton } from "./Skeleton"

export function ProductListSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-indigo-950">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-28 bg-indigo-200/30" />
          <Skeleton className="h-4 w-40 bg-indigo-200/30" />
        </div>
      </div>

      <div className="p-4 border-b border-gray-100">
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>

      <div className="divide-y divide-gray-50">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`product-list-skeleton-${i}`} className="flex items-center gap-4 p-4">
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
            <div className="flex-1 min-w-0 space-y-1.5">
              <Skeleton className="h-4 w-full max-w-[200px]" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="text-right space-y-1.5">
              <Skeleton className="h-4 w-16 ml-auto" />
              <Skeleton className="h-3 w-12 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
