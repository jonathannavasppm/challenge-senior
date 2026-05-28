"use client"

import { useState, useEffect, useRef } from "react"
import type { Product } from "@/app/dashboard/types"
import { formatearMoneda } from "@/app/dashboard/utils/formatters"

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const [topProducts, setTopProducts] = useState<Product[]>([])
  const [filterText, setFilterText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    )
    setTopProducts(filtered)
  }, [products, filterText])

  return (
    <div
      className="rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="p-6 border-b border-gray-100 bg-[#1a1a2e]">
        <h2 className="text-lg font-semibold text-white">Top Products</h2>
        <p className="text-sm text-blue-200 mt-0.5">
          Best performing this month
        </p>
      </div>

      <div className="p-4 border-b border-gray-100">
        <input
          ref={inputRef}
          placeholder="Filter products..."
          defaultValue=""
          onChange={(e) => setFilterText(e.target.value)}
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
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-gray-900">
                {formatearMoneda(product.price)}
              </p>
              <div className="flex items-center gap-1 justify-end">
                <span className="text-yellow-400 text-xs">★</span>
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
