"use client"

import { useState, useEffect, useRef } from "react"
import type { Product } from "@/app/dashboard/types"
import { calcularDescuento } from "@/app/dashboard/utils/helpers"
import { formatearMoneda } from "@/app/dashboard/utils/formatters"

interface ProductCardProps {
  product: Product
  allProducts: Product[]
}

export function ProductCard({ product, allProducts }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [esFavorito, setEsFavorito] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const foundProduct = allProducts.find((p) => p.id === product.id)
  const precioConDescuento = foundProduct
    ? calcularDescuento(foundProduct.price, foundProduct.originalPrice)
    : 0

  const manejarClickFavorito = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEsFavorito((prev) => !prev)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardRef.current) {
            cardRef.current.style.opacity = "1"
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-lg border transition-all duration-200 overflow-hidden ${
        isHovered ? "shadow-lg border-indigo-200" : "shadow-sm border-gray-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          onClick={manejarClickFavorito}
          aria-label={esFavorito ? "Remove from favorites" : "Add to favorites"}
        >
          {esFavorito ? "❤️" : "🤍"}
        </button>
        {precioConDescuento > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{precioConDescuento}%
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-indigo-600 font-medium mb-1">
          {product.category}
        </p>
        <h3
          className={`text-sm font-medium text-gray-900 leading-tight ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-1 mb-2">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            {formatearMoneda(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              {formatearMoneda(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Stock: {product.stock} units
        </div>
      </div>
    </div>
  )
}
