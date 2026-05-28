import type { FilterOptions } from "@/app/dashboard/types"

export const DEFAULT_FILTERS: FilterOptions = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 0,
  sortBy: "name",
  sortOrder: "asc",
}
