"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"
import type { DashboardData, FilterOptions } from "@/app/dashboard/types"
import { DASHBOARD_DATA } from "@/data/mock-data"
import type { DashboardContextValue, UserConfig } from "./types"
import { DEFAULT_FILTERS, DEFAULT_CONTEXT } from "./const"


export const DashboardContext =
  createContext<DashboardContextValue>(DEFAULT_CONTEXT)

export function DashboardProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(DASHBOARD_DATA)
  const [isLoading] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS)

  const userConfig = useMemo<UserConfig>(
    () => ({
      name: "Jhon Doe",
      avatar: "JN",
      role: "Admin",
      notifications: 3,
    }),
    []
  )

  const updateData = useCallback((data: Partial<DashboardData>) => {
    setDashboardData((prev) => ({ ...prev, ...data }))
  }, [])

  const value = useMemo(
    () => ({
      dashboardData,
      updateData,
      userConfig,
      isLoading,
      filters,
      setFilters,
    }),
    [dashboardData, updateData, userConfig, isLoading, filters]
  )

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardContext(): DashboardContextValue {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within DashboardProvider"
    )
  }
  return context
}
