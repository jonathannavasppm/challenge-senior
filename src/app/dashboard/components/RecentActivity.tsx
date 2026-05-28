"use client"

import { useMemo } from "react"
import { usePolling } from "@/app/dashboard/hooks/usePolling"
import { formatDate } from "@/app/dashboard/utils/formatters"
import { ACTIVITY_ICONS } from "@/app/dashboard/context/DashboardContext/const"

export function RecentActivity() {
  const { activities, lastUpdated, isPolling } = usePolling()

  const formattedTime = useMemo(() => {
    return lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : ""
  }, [lastUpdated])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <p className="text-xs text-gray-400 mt-0.5" suppressHydrationWarning>
              Last updated: {formattedTime}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${
                isPolling ? "bg-green-400 animate-pulse" : "bg-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">
              {isPolling ? "Live" : "Paused"}
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-50 grow overflow-y-auto">
        {activities.slice(0, 8).map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-4">
            <span className="text-lg flex-shrink-0 mt-0.5">
              {ACTIVITY_ICONS[activity.type] || "📌"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 leading-tight">
                {activity.message}
              </p>
              <p className="text-xs text-gray-400 mt-0.5" suppressHydrationWarning>
                {formatDate(activity.timestamp, "relative")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
