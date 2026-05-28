import { Suspense } from "react"
import type { Metadata } from "next"
import { DASHBOARD_DATA } from "@/data/mock-data"
import { HeroBanner } from "@/app/dashboard/components/HeroBanner"
import { MetricsCards } from "@/app/dashboard/components/MetricsCards"
import { OrdersTable } from "@/app/dashboard/components/OrdersTable"
import { ProductList } from "@/app/dashboard/components/ProductList"
import { ProductCatalog } from "@/app/dashboard/components/ProductCatalog"
import { RevenueChart } from "@/app/dashboard/components/RevenueChart"
import { RecentActivity } from "@/app/dashboard/components/RecentActivity"
import {
  HeroBannerSkeleton,
  MetricsCardsSkeleton,
  RevenueChartSkeleton,
  RecentActivitySkeleton,
  OrdersTableSkeleton,
  ProductListSkeleton,
  ProductCatalogSkeleton,
} from "@/app/dashboard/components/skeletons"

export const metadata: Metadata = {
  title: "Overview — ShopMetrics",
  description: "E-commerce analytics dashboard overview",
}

async function getDashboardData() {
  const [metrics, orders, products, revenue] = await Promise.all([
    fetchMetrics(),
    fetchOrders(),
    fetchProducts(),
    fetchRevenue(),
  ])
  return { metrics, orders, products, revenue }
}

export default async function DashboardPage() {
  const { metrics, orders, products, revenue } = await getDashboardData()

  return (
    <div className="space-y-6">
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroBanner />
      </Suspense>

      <Suspense fallback={<MetricsCardsSkeleton />}>
        <MetricsCards metrics={metrics} />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 h-full">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart data={revenue} />
          </Suspense>
        </div>
        <div className="h-full">
          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<OrdersTableSkeleton />}>
            <OrdersTable orders={orders} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList products={products} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<ProductCatalogSkeleton />}>
        <ProductCatalog />
      </Suspense>
    </div>
  )
}

async function fetchMetrics() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return DASHBOARD_DATA.metrics
}

async function fetchOrders() {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return DASHBOARD_DATA.recentOrders
}

async function fetchProducts() {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return DASHBOARD_DATA.topProducts
}

async function fetchRevenue() {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return DASHBOARD_DATA.revenueByMonth
}
