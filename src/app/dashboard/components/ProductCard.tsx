"use client"

import { memo, useState } from "react"
import Image from "next/image"
import type { Product } from "@/app/dashboard/types"
import { calculateDiscount } from "@/app/dashboard/utils/helpers"
import { formatCurrency } from "@/app/dashboard/utils/formatters"

interface ProductCardProps {
  readonly product: Product
}

export const ProductCard = memo(function ProductCard({
  product,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const discount = calculateDiscount(product.price, product.originalPrice)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite((prev) => !prev)
  }

  return (
    <div
      className="bg-white rounded-lg border shadow-sm border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setIsExpanded((prev) => !prev)
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${product.name} — ${formatCurrency(product.price)}`}
    >
      <div className="relative h-40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover"
        />
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
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

        <div
          className="flex items-center gap-1 mt-1 mb-2"
          aria-label={`Rating: ${product.rating} out of 5, ${product.reviewCount} reviews`}
        >
          <span className="text-yellow-400 text-xs" aria-hidden="true">★</span>
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Stock: {product.stock} units
        </div>
      </div>
    </div>
  )
})
