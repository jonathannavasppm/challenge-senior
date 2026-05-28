import { Skeleton } from "./Skeleton"

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full aspect-16/6 overflow-hidden rounded-xl">
      <Skeleton className="absolute inset-0 rounded-xl" />
      <div className="absolute inset-0 bg-gray-300/50 flex flex-col justify-end p-8 space-y-3">
        <Skeleton className="h-10 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-1/2 max-w-md" />
        <Skeleton className="h-12 w-32 mt-4 rounded-lg" />
      </div>
    </div>
  )
}
