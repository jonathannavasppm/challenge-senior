import type { OrderStatus, EstadoPedido } from "@/app/dashboard/types"

export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}

export function formatDate(
  date: string,
  format: "short" | "long" | "relative" = "short"
): string {
  const dateObj = new Date(date)

  if (format === "relative") {
    const diffMs = Date.now() - dateObj.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return "just now"
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHours = Math.floor(diffMin / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  if (format === "long") {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function getOrderStatus(status: OrderStatus): EstadoPedido {
  const mapping: Record<OrderStatus, EstadoPedido> = {
    pending: "pendiente",
    processing: "procesando",
    shipped: "enviado",
    delivered: "entregado",
    cancelled: "cancelado",
  }
  return mapping[status]
}

export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return String(value)
}

export function formatPercentage(value: number, decimals: number = 1): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(decimals)}%`
}
