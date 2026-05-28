"use client"

import { useState } from "react"
import type { Product, FilterOptions } from "@/app/dashboard/types"
import { ProductCard } from "./ProductCard"
import { SearchFilter } from "./SearchFilter"
import { calcularDescuento } from "@/app/dashboard/utils/helpers"
import { ALL_PRODUCTS } from "@/data/mock-data"

const PAGE_SIZE = 5000

export function ProductCatalog() {
  const [productosFiltrados, setProductosFiltrados] =
    useState<Product[]>(ALL_PRODUCTS)
  const [estaCargando, setEstaCargando] = useState(false)
  const [cantidadTotal] = useState(ALL_PRODUCTS.length)
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)

  const manejarBusqueda = (filters: Partial<FilterOptions>) => {
    setEstaCargando(true)

    let results = [...ALL_PRODUCTS]

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
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      )
    }

    if (filters.sortBy) {
      results.sort((a, b) => {
        const order = filters.sortOrder === "desc" ? -1 : 1
        if (filters.sortBy === "price") return (a.price - b.price) * order
        if (filters.sortBy === "rating") return (a.rating - b.rating) * order
        return a.name.localeCompare(b.name) * order
      })
    }

    setProductosFiltrados(results)
    setEstaCargando(false)
  }

  const mostrarMasProductos = () => {
    setDisplayCount((prev) => prev + 100)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Product Catalog
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {estaCargando
                ? "Filtering..."
                : `${productosFiltrados.length.toLocaleString()} of ${cantidadTotal.toLocaleString()} products`}
            </p>
          </div>
          {productosFiltrados.length > displayCount && (
            <button
              onClick={mostrarMasProductos}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Show More
            </button>
          )}
        </div>
        <SearchFilter
          onFilterChange={manejarBusqueda}
          totalResults={productosFiltrados.length}
        />
      </div>

      {estaCargando ? (
        <div className="p-12 text-center text-gray-500">
          <div className="text-2xl mb-2">⏳</div>
          <p>Filtering {cantidadTotal.toLocaleString()} products...</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {productosFiltrados.slice(0, displayCount).map((product) => {
              const descuento = calcularDescuento(
                product.price,
                product.originalPrice
              )

              return (
                <div key={product.id} data-discount={descuento}>
                  <ProductCard
                    product={product}
                    allProducts={ALL_PRODUCTS}
                  />
                </div>
              )
            })}
          </div>

          {productosFiltrados.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <div className="text-3xl mb-3">🔍</div>
              <p className="font-medium">No products found</p>
              <p className="text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
