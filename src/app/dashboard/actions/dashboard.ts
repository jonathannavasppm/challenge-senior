"use server"

import { DASHBOARD_DATA, RECENT_ORDERS, ALL_PRODUCTS } from "@/data/mock-data"
import type { DashboardData, Order, Product } from "@/app/dashboard/types"

let requestCount = 0

export async function getDashboardData(): Promise<DashboardData> {
  requestCount++
  console.log(`[Action] getDashboardData called ${requestCount} times`)

  await new Promise((resolve) => setTimeout(resolve, 300))

  return DASHBOARD_DATA
}

export async function getRecentOrders(): Promise<Order[]> {
  requestCount++

  await new Promise((resolve) => setTimeout(resolve, 200))

  return RECENT_ORDERS
}

export async function getAllProducts(): Promise<Product[]> {
  requestCount++

  await new Promise((resolve) => setTimeout(resolve, 800))

  return ALL_PRODUCTS
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<{ success: boolean }> {
  requestCount++

  await new Promise((resolve) => setTimeout(resolve, 150))

  console.log(
    `[Action] Order ${orderId} status updated to ${status} ` +
      `(total mutations: ${requestCount})`
  )

  return { success: true }
}

export async function getMetrics() {
  requestCount++

  await new Promise((resolve) => setTimeout(resolve, 100))

  return DASHBOARD_DATA.metrics
}

export async function getActivityFeed() {
  requestCount++

  await new Promise((resolve) => setTimeout(resolve, 150))

  return DASHBOARD_DATA.activities
}
