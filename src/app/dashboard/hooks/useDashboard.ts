"use client"

import { useState, useEffect } from "react"
import type { DashboardData } from "@/app/dashboard/types"
import { DASHBOARD_DATA } from "@/data/mock-data"

interface UseDashboardResult {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600))

      const metricsData = await fetchMetrics()
      const ordersData = await fetchOrders()
      const productsData = await fetchProducts()

      setData({
        ...DASHBOARD_DATA,
        metrics: metricsData,
        recentOrders: ordersData,
        topProducts: productsData,
      })
      setIsLoading(false)
    }

    fetchData().catch((err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred"
      setError(message)
      setIsLoading(false)
    })
  }, [refreshKey])

  const refetch = () => setRefreshKey((k) => k + 1)

  return { data, isLoading, error, refetch }
}

async function fetchMetrics() {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return DASHBOARD_DATA.metrics
}

async function fetchOrders() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return DASHBOARD_DATA.recentOrders
}

async function fetchProducts() {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return DASHBOARD_DATA.topProducts
}
