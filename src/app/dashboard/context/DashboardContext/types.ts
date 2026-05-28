import type { DashboardData, FilterOptions } from "@/app/dashboard/types"

export interface UserConfig {
  name: string
  avatar: string
  role: string
  notifications: number
}

export interface DashboardContextValue {
  dashboardData: DashboardData
  updateData: (data: Partial<DashboardData>) => void
  userConfig: UserConfig
  isLoading: boolean
  filters: FilterOptions
  setFilters: (filters: FilterOptions) => void
}
