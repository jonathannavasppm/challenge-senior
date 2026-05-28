"use client"

import { useState, useCallback, useTransition } from "react"
import { VirtuosoGrid } from "react-virtuoso"
import type { FilterOptions } from "@/app/dashboard/types"
import { ProductCard } from "./ProductCard"
import { SearchFilter } from "./SearchFilter"
import { ALL_PRODUCTS } from "@/data/mock-data"

export function ProductCatalog() {
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS)
  const [isPending, startTransition] = useTransition()

  const handleFilterChange = useCallback(
    (filters: Partial<FilterOptions>) => {
      startTransition(() => {
        let results = ALL_PRODUCTS

        if (filters.search) {
          const term = filters.search.toLowerCase()
          results = results.filter(
            (p) =>
              p.name.toLowerCase().includes(term) ||
              p.category.toLowerCase().includes(term)
          )
        }

        if (filters.category && filters.category !== "all") {
          results = results.filter(
            (p) =>
              p.category.toLowerCase() === filters.category!.toLowerCase()
          )
        }

        if (filters.sortBy) {
          results = results.toSorted((a, b) => {
            const order = filters.sortOrder === "desc" ? -1 : 1
            if (filters.sortBy === "price") return (a.price - b.price) * order
            if (filters.sortBy === "rating")
              return (a.rating - b.rating) * order
            return a.name.localeCompare(b.name) * order
          })
        }

        setFilteredProducts(results)
      })
    },
    []
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Product Catalog
            </h2>
            <p className="text-sm text-gray-500 mt-0.5" suppressHydrationWarning>
              {isPending
                ? "Filtering..."
                : `${filteredProducts.length.toLocaleString("en-US")} of ${ALL_PRODUCTS.length.toLocaleString("en-US")} products`}
            </p>
          </div>
        </div>
        <SearchFilter
          onFilterChange={handleFilterChange}
          totalResults={filteredProducts.length}
        />
      </div>

      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <div className="text-3xl mb-3">🔍</div>
            <p className="font-medium">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <VirtuosoGrid
            style={{ height: "600px" }}
            totalCount={filteredProducts.length}
            listClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            itemContent={(index) => (
              <ProductCard product={filteredProducts[index]} />
            )}
          />
        )}
      </div>
    </div>
  )
}
