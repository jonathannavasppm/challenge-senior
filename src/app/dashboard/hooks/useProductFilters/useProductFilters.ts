"use client"

import { useState, useMemo, useCallback } from "react"
import type { Product, FilterOptions } from "@/app/dashboard/types"
import { ALL_PRODUCTS } from "@/data/mock-data"
import type { UseProductFiltersResult } from "./types"
import { DEFAULT_FILTERS } from "./const"

export function useProductFilters(
  products: Product[] = ALL_PRODUCTS
): UseProductFiltersResult {
  const [activeFilters, setActiveFilters] =
    useState<FilterOptions>(DEFAULT_FILTERS)

  const setFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setActiveFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const filteredResults = useMemo(() => {
    let result = products

    if (activeFilters.search) {
      const term = activeFilters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      )
    }

    if (activeFilters.category && activeFilters.category !== "all") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === activeFilters.category.toLowerCase()
      )
    }

    if (activeFilters.minPrice > 0) {
      result = result.filter((p) => p.price >= activeFilters.minPrice)
    }

    if (activeFilters.maxPrice > 0) {
      result = result.filter((p) => p.price <= activeFilters.maxPrice)
    }

    return result.toSorted((a, b) => {
      const order = activeFilters.sortOrder === "asc" ? 1 : -1
      if (activeFilters.sortBy === "price") return (a.price - b.price) * order
      if (activeFilters.sortBy === "rating")
        return (a.rating - b.rating) * order
      if (activeFilters.sortBy === "stock") return (a.stock - b.stock) * order
      return a.name.localeCompare(b.name) * order
    })
  }, [activeFilters, products])

  return {
    filteredResults,
    activeFilters,
    setFilters,
    totalCount: products.length,
  }
}
