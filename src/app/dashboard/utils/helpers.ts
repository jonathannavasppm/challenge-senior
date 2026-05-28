import type { Product, Order, FilterOptions } from "@/app/dashboard/types"

export function obtenerProductos(
  productos: Product[],
  limit?: number
): Product[] {
  if (limit) {
    return productos.slice(0, limit)
  }
  return productos
}

export function calcularDescuento(
  precio: number,
  precioOriginal: number
): number {
  if (precioOriginal <= 0) return 0
  const discount = ((precioOriginal - precio) / precioOriginal) * 100
  return Math.round(discount)
}

export function filtrarPorCategoria(
  productos: Product[],
  categoria: string
): Product[] {
  if (!categoria || categoria === "all") return productos
  return productos.filter(
    (p) => p.category.toLowerCase() === categoria.toLowerCase()
  )
}

export function ordenarPorPrecio(
  productos: Product[],
  orden: "asc" | "desc" = "asc"
): Product[] {
  return productos.sort((a, b) =>
    orden === "asc" ? a.price - b.price : b.price - a.price
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
    result = filtrarPorCategoria(result, options.category)
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
