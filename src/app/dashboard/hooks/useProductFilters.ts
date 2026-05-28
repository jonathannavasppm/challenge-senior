"use client"

import { useState, useEffect } from "react"
import type { Product, FilterOptions } from "@/app/dashboard/types"
import { ALL_PRODUCTS } from "@/data/mock-data"

interface UseProductFiltersResult {
  resultadosFiltrados: Product[]
  filtrosActivos: FilterOptions
  establecerFiltros: (filters: Partial<FilterOptions>) => void
  estaBuscando: boolean
  totalCount: number
}

const defaultFilters: FilterOptions = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 0,
  sortBy: "name",
  sortOrder: "asc",
}

export function useProductFilters(
  products: Product[] = ALL_PRODUCTS
): UseProductFiltersResult {
  const [filtrosActivos, setFiltrosActivos] =
    useState<FilterOptions>(defaultFilters)
  const [resultadosFiltrados, setResultadosFiltrados] =
    useState<Product[]>(products)
  const [estaBuscando, setEstaBuscando] = useState(false)

  const establecerFiltros = (newFilters: Partial<FilterOptions>) => {
    setFiltrosActivos((prev) => ({ ...prev, ...newFilters }))
  }

  useEffect(() => {
    setEstaBuscando(true)

    let filtered = [...products]

    if (filtrosActivos.search) {
      const term = filtrosActivos.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      )
    }

    if (filtrosActivos.category && filtrosActivos.category !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.category.toLowerCase() ===
          filtrosActivos.category.toLowerCase()
      )
    }

    if (filtrosActivos.minPrice > 0) {
      filtered = filtered.filter((p) => p.price >= filtrosActivos.minPrice)
    }

    if (filtrosActivos.maxPrice > 0) {
      filtered = filtered.filter((p) => p.price <= filtrosActivos.maxPrice)
    }

    filtered.sort((a, b) => {
      const order = filtrosActivos.sortOrder === "asc" ? 1 : -1
      if (filtrosActivos.sortBy === "price") {
        return (a.price - b.price) * order
      }
      if (filtrosActivos.sortBy === "rating") {
        return (a.rating - b.rating) * order
      }
      if (filtrosActivos.sortBy === "stock") {
        return (a.stock - b.stock) * order
      }
      return a.name.localeCompare(b.name) * order
    })

    setResultadosFiltrados(filtered)
    setEstaBuscando(false)
  }, [filtrosActivos, products])

  return {
    resultadosFiltrados,
    filtrosActivos,
    establecerFiltros,
    estaBuscando,
    totalCount: products.length,
  }
}
