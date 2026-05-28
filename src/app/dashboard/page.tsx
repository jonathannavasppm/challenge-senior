"use client"

import { useState, useEffect } from "react"
import type { DashboardData } from "@/app/dashboard/types"
import { DASHBOARD_DATA } from "@/data/mock-data"
import { HeroBanner } from "@/app/dashboard/components/HeroBanner"
import { MetricsCards } from "@/app/dashboard/components/MetricsCards"
import { OrdersTable } from "@/app/dashboard/components/OrdersTable"
import { ProductList } from "@/app/dashboard/components/ProductList"
import { ProductCatalog } from "@/app/dashboard/components/ProductCatalog"
import { RevenueChart } from "@/app/dashboard/components/RevenueChart"
import { RecentActivity } from "@/app/dashboard/components/RecentActivity"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true)

      const metrics = await fetchMetrics()
      const orders = await fetchOrders()
      const products = await fetchProducts()
      const revenue = await fetchRevenue()

      setDashboardData({
        ...DASHBOARD_DATA,
        metrics,
        recentOrders: orders,
        topProducts: products,
        revenueByMonth: revenue,
      })
      setIsLoading(false)
    }

    loadDashboard()
  }, [])

  if (isLoading || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-500 text-lg">Loading dashboard...</p>
          <p className="text-gray-400 text-sm mt-1">
            Fetching 5,000 products and metrics
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <HeroBanner />

      <MetricsCards dashboardData={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={dashboardData.revenueByMonth} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrdersTable orders={dashboardData.recentOrders} />
        </div>
        <div>
          <ProductList products={dashboardData.topProducts} />
        </div>
      </div>

      <ProductCatalog />
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
