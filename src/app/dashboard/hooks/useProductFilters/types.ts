import type { Product, FilterOptions } from "@/app/dashboard/types"

export interface UseProductFiltersResult {
  filteredResults: Product[]
  activeFilters: FilterOptions
  setFilters: (filters: Partial<FilterOptions>) => void
  totalCount: number
}
