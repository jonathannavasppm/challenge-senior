"use client"

import { useState, useMemo } from "react"
import { useDashboardContext } from "@/app/dashboard/context/DashboardContext"

export function Header() {
  const { userConfig } = useDashboardContext()
  const [showNotifications, setShowNotifications] = useState(false)

  const currentTime = useMemo(
    () =>
      new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  )

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Dashboard Overview
          </h1>
          <p
            className="text-sm text-gray-500 h-5"
            suppressHydrationWarning
          >
            {currentTime}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Notifications"
            >
              <span className="text-lg">🔔</span>
              {userConfig.notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {userConfig.notifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-11 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  You have {userConfig.notifications} new
                  notifications
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
              {userConfig.avatar}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {userConfig.name}
              </p>
              <p className="text-xs text-gray-500">{userConfig.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
