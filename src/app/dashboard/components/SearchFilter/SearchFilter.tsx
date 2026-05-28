"use client"

import { useState, useEffect } from "react"
import type { FilterOptions } from "@/app/dashboard/types"
import { CATEGORIES } from "./const"

interface SearchFilterProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void
  totalResults: number
}

export function SearchFilter({
  onFilterChange,
  totalResults,
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] =
    useState<FilterOptions["sortBy"]>("name")
  const [sortOrder, setSortOrder] =
    useState<FilterOptions["sortOrder"]>("asc")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        search: searchTerm,
        category: selectedCategory,
        sortBy,
        sortOrder,
      })
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, sortBy, sortOrder, onFilterChange])

  const handleClear = () => {
    setSearchTerm("")
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
            value={searchTerm}
            onChange={handleSearchChange}
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

        {(searchTerm || selectedCategory !== "all") && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <span suppressHydrationWarning>{totalResults.toLocaleString("en-US")} products found</span>
      </div>
    </div>
  )
}
