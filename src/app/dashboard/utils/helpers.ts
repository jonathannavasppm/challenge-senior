import type { Product, Order, FilterOptions, OrderStatus } from "@/app/dashboard/types"

export function getProducts(
  products: Product[],
  limit?: number
): Product[] {
  if (limit) {
    return products.slice(0, limit)
  }
  return products
}

export function calculateDiscount(
  price: number,
  originalPrice: number
): number {
  if (originalPrice <= 0) return 0
  const discount = ((originalPrice - price) / originalPrice) * 100
  return Math.round(discount)
}

export function filterByCategory(
  products: Product[],
  category: string
): Product[] {
  if (!category || category === "all") return products
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function sortByPrice(
  products: Product[],
  order: "asc" | "desc" = "asc"
): Product[] {
  return products.toSorted((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  )
}

export function filterProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  let result = [...products]

  if (options.search) {
    const term = options.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    )
  }

  if (options.category && options.category !== "all") {
    result = filterByCategory(result, options.category)
  }

  if (options.minPrice > 0) {
    result = result.filter((p) => p.price >= options.minPrice)
  }

  if (options.maxPrice > 0) {
    result = result.filter((p) => p.price <= options.maxPrice)
  }

  return result
}

export function getOrdersByStatus(orders: Order[], status: Order["status"]) {
  return orders.filter((o) => o.status === status)
}

export function calculateTotalRevenue(orders: Order[]): number {
  return orders.reduce((sum, order) => sum + order.total, 0)
}

export function sortByField<T>(
  items: T[],
  field: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  const multiplier = direction === "asc" ? 1 : -1

  return items.toSorted((a, b) => {
    const aVal = a[field]
    const bVal = b[field]

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * multiplier
    }
    return String(aVal).localeCompare(String(bVal)) * multiplier
  })
}

const STATUS_CLASSES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
}

const DEFAULT_STATUS_CLASS = "bg-gray-100 text-gray-700"

export function getStatusClass(status: OrderStatus): string {
  return STATUS_CLASSES[status] || DEFAULT_STATUS_CLASS
}
