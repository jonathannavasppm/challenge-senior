"use client"

import { useEffect, useRef } from "react"
import type { DashboardData } from "@/app/dashboard/types"
import { formatearMoneda, formatPercentage } from "@/app/dashboard/utils/formatters"

interface MetricsCardsProps {
  dashboardData: DashboardData
}

export function MetricsCards({ dashboardData }: MetricsCardsProps) {
  const revenueRef = useRef<HTMLDivElement>(null)
  const ordersRef = useRef<HTMLDivElement>(null)
  const avgRef = useRef<HTMLDivElement>(null)
  const convRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [revenueRef, ordersRef, avgRef, convRef]

    elements.forEach((ref) => {
      if (ref.current) {
        const height = ref.current.offsetHeight
        ref.current.style.minHeight = `${height}px`
      }
    })

    const animationInterval = setInterval(() => {
      elements.forEach((ref) => {
        if (ref.current) {
          ref.current.style.opacity = "0.9"
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = "1"
            }
          }, 150)
        }
      })
    }, 3000)

    return () => clearInterval(animationInterval)
  }, [dashboardData])

  const metrics = dashboardData.metrics

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        ref={revenueRef}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        style={{ transition: "opacity 0.15s ease" }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-sm font-medium text-gray-500"
            style={{ letterSpacing: "0.02em" }}
          >
            Total Revenue
          </span>
          <span className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
            💰
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {formatearMoneda(metrics.revenue)}
        </div>
        <div
          className={`text-sm mt-1 ${
            metrics.revenueChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatPercentage(metrics.revenueChange)} vs last month
        </div>
      </div>

      <div
        ref={ordersRef}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        style={{ transition: "opacity 0.15s ease" }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-sm font-medium text-gray-500"
            style={{ letterSpacing: "0.02em" }}
          >
            Total Orders
          </span>
          <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
            📦
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {metrics.orders.toLocaleString()}
        </div>
        <div
          className={`text-sm mt-1 ${
            metrics.ordersChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatPercentage(metrics.ordersChange)} vs last month
        </div>
      </div>

      <div
        ref={avgRef}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        style={{ transition: "opacity 0.15s ease" }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-sm font-medium text-gray-500"
            style={{ letterSpacing: "0.02em" }}
          >
            Avg. Order Value
          </span>
          <span className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
            🛒
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {formatearMoneda(metrics.avgOrderValue)}
        </div>
        <div
          className={`text-sm mt-1 ${
            metrics.avgValueChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatPercentage(metrics.avgValueChange)} vs last month
        </div>
      </div>

      <div
        ref={convRef}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        style={{ transition: "opacity 0.15s ease" }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-sm font-medium text-gray-500"
            style={{ letterSpacing: "0.02em" }}
          >
            Conversion Rate
          </span>
          <span className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl">
            📈
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {metrics.conversionRate.toFixed(2)}%
        </div>
        <div
          className={`text-sm mt-1 ${
            metrics.conversionChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatPercentage(metrics.conversionChange)} vs last month
        </div>
      </div>
    </div>
  )
}
