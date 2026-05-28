"use client"

import { useState, useEffect } from "react"
import type { FilterOptions } from "@/app/dashboard/types"

interface SearchFilterProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void
  totalResults: number
}

const CATEGORIES = [
  "all",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
  "Beauty",
  "Automotive",
]

export function SearchFilter({
  onFilterChange,
  totalResults,
}: SearchFilterProps) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] =
    useState<FilterOptions["sortBy"]>("name")
  const [sortOrder, setSortOrder] =
    useState<FilterOptions["sortOrder"]>("asc")

  const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminoBusqueda(e.target.value)
  }

  useEffect(() => {
    onFilterChange({
      search: terminoBusqueda,
      category: selectedCategory,
      sortBy,
      sortOrder,
    })
  }, [terminoBusqueda, selectedCategory, sortBy, sortOrder, onFilterChange])

  const handleClear = () => {
    setTerminoBusqueda("")
    setSelectedCategory("all")
    setSortBy("name")
    setSortOrder("asc")
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={terminoBusqueda}
            onChange={manejarCambioBusqueda}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-") as [
              FilterOptions["sortBy"],
              FilterOptions["sortOrder"],
            ]
            setSortBy(field)
            setSortOrder(order)
          }}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="stock-desc">Most Stock</option>
        </select>

        {(terminoBusqueda || selectedCategory !== "all") && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        {totalResults.toLocaleString()} products found
      </div>
    </div>
  )
}
