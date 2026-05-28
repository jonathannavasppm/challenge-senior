import type { DashboardData } from "@/app/dashboard/types"

export interface UseDashboardResult {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}
