import type { DashboardData } from "@/app/dashboard/types"
import { formatCurrency, formatPercentage } from "@/app/dashboard/utils/formatters"

interface MetricsCardsProps {
  readonly metrics: DashboardData["metrics"]
}

export function MetricsCards({ metrics }: MetricsCardsProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity duration-150"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 tracking-wide">
            Total Revenue
          </span>
          <span className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl" role="img" aria-label="Revenue icon">
            💰
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(metrics.revenue)}
        </div>
        <div
          className={`text-sm mt-1 ${
            metrics.revenueChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatPercentage(metrics.revenueChange)} vs last month
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity duration-150"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 tracking-wide">
            Total Orders
          </span>
          <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl" role="img" aria-label="Orders icon">
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

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity duration-150"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 tracking-wide">
            Avg. Order Value
          </span>
          <span className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl" role="img" aria-label="Cart icon">
            🛒
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(metrics.avgOrderValue)}
        </div>
        <div
          className={`text-sm mt-1 ${
            metrics.avgValueChange >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {formatPercentage(metrics.avgValueChange)} vs last month
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity duration-150"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 tracking-wide">
            Conversion Rate
          </span>
          <span className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl" role="img" aria-label="Conversion icon">
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
