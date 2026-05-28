"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import type { Product } from "@/app/dashboard/types"
import { formatCurrency } from "@/app/dashboard/utils/formatters"

interface ProductListProps {
  readonly products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const [filterText, setFilterText] = useState("")

  const topProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(filterText.toLowerCase())
      ),
    [products, filterText]
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-indigo-950">
        <h2 className="text-lg font-semibold text-white">Top Products</h2>
        <p className="text-sm text-indigo-300 mt-0.5">
          Best performing this month
        </p>
      </div>

      <div className="p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Filter products..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          aria-label="Filter products by name"
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="divide-y divide-gray-50">
        {topProducts.slice(0, 10).map((product, idx) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-400 w-6 text-center">
              {idx + 1}
            </span>
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="48px"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(product.price)}
              </p>
              <div
                className="flex items-center gap-1 justify-end"
                aria-label={`Rating: ${product.rating} out of 5`}
              >
                <span className="text-yellow-400 text-xs" aria-hidden="true">★</span>
                <span className="text-xs text-gray-500">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {topProducts.length === 0 && (
        <div className="p-8 text-center text-gray-500 text-sm">
          No products match your filter
        </div>
      )}
    </div>
  )
}
