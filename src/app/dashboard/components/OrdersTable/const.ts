import type { Order } from "@/app/dashboard/types"

interface OrderColumn {
  key: keyof Order
  label: string
}

export const ORDER_COLUMNS: OrderColumn[] = [
  { key: "id", label: "Order ID" },
  { key: "customer", label: "Customer" },
  { key: "total", label: "Total" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
]

export const MAX_VISIBLE_ORDERS = 20
