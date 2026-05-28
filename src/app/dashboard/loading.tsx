import {
  HeroBannerSkeleton,
  MetricsCardsSkeleton,
  RevenueChartSkeleton,
  RecentActivitySkeleton,
  OrdersTableSkeleton,
  ProductListSkeleton,
} from "@/app/dashboard/components/skeletons"

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <HeroBannerSkeleton />
      <MetricsCardsSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChartSkeleton />
        </div>
        <div>
          <RecentActivitySkeleton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrdersTableSkeleton />
        </div>
        <div>
          <ProductListSkeleton />
        </div>
      </div>
    </div>
  )
}
