"use client"

import { useState } from "react"
import type { RevenueDataPoint } from "@/app/dashboard/types"
import { formatCurrency } from "@/app/dashboard/utils/formatters"

interface RevenueChartProps {
  readonly data: RevenueDataPoint[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [activeMonth, setActiveMonth] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"revenue" | "orders">("revenue")

  const maxRevenue = Math.max(...data.map((d) => d.revenue))
  const maxOrders = Math.max(...data.map((d) => d.orders))
  const maxValue = viewMode === "revenue" ? maxRevenue : maxOrders

  const getValue = (point: RevenueDataPoint) =>
    viewMode === "revenue" ? point.revenue : point.orders

  const formatValue = (val: number) =>
    viewMode === "revenue" ? formatCurrency(val) : val.toLocaleString("en-US")

  const activeData = activeMonth
    ? data.find((d) => d.month === activeMonth)
    : null

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Revenue Overview
          </h2>
          <p className="text-sm text-gray-500">Last 12 months</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("revenue")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === "revenue"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setViewMode("orders")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === "orders"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {activeData && (
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg text-sm">
          <span className="font-semibold text-indigo-700">
            {activeData.month}:
          </span>{" "}
          <span className="text-indigo-600">
            {formatValue(getValue(activeData))}
          </span>
        </div>
      )}

      <div className="flex items-end gap-1.5 grow min-h-48">
        {data.map((point) => {
          const height =
            maxValue > 0
              ? Math.max(4, (getValue(point) / maxValue) * 100)
              : 4
          const isActive = activeMonth === point.month

          return (
            <div
              key={point.month}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
              tabIndex={0}
              role="button"
              aria-label={`${point.month}: ${formatValue(getValue(point))}`}
              onMouseEnter={() => setActiveMonth(point.month)}
              onMouseLeave={() => setActiveMonth(null)}
              onFocus={() => setActiveMonth(point.month)}
              onBlur={() => setActiveMonth(null)}
            >
              <div className="w-full flex items-end" style={{ height: "100%" }}>
                <div
                  className={`w-full rounded-t-sm transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-600"
                      : "bg-indigo-200 group-hover:bg-indigo-400"
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 leading-none">
                {point.month}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
        <span>
          Total:{" "}
          {viewMode === "revenue"
            ? formatCurrency(data.reduce((s, d) => s + d.revenue, 0))
            : data.reduce((s, d) => s + d.orders, 0).toLocaleString()}
        </span>
        <span>
          Avg:{" "}
          {viewMode === "revenue"
            ? formatCurrency(
                data.reduce((s, d) => s + d.revenue, 0) / data.length
              )
            : Math.round(
                data.reduce((s, d) => s + d.orders, 0) / data.length
              ).toLocaleString()}
        </span>
      </div>
    </div>
  )
}
