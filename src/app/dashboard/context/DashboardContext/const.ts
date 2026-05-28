import type { FilterOptions } from "@/app/dashboard/types"
import type { DashboardContextValue } from "./types"
import { DASHBOARD_DATA } from "@/data/mock-data"

export const DEFAULT_FILTERS: FilterOptions = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 0,
  sortBy: "name",
  sortOrder: "asc",
}

export const DEFAULT_CONTEXT: DashboardContextValue = {
  dashboardData: DASHBOARD_DATA,
  updateData: () => {},
  userConfig: {
    name: "Jhon Doe",
    avatar: "JN",
    role: "Admin",
    notifications: 3,
  },
  isLoading: false,
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
}

export const ACTIVITY_ICONS: Record<string, string> = {
  order: "🛍️",
  signup: "👤",
  refund: "↩️",
  review: "⭐",
}
