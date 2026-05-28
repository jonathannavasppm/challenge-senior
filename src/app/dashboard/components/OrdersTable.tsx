"use client"

import { useState } from "react"
import type { Order, OrderStatus } from "@/app/dashboard/types"
import { formatearMoneda, formatearFecha } from "@/app/dashboard/utils/formatters"

interface OrdersTableProps {
  orders: Order[]
}

function obtenerClaseEstado(status: OrderStatus): string {
  const clases: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }
  return clases[status] || "bg-gray-100 text-gray-700"
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [sortField, setSortField] = useState<keyof Order>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filaSeleccionada, setFilaSeleccionada] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedOrders = filteredOrders.sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    const multiplier = sortDirection === "asc" ? 1 : -1

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * multiplier
    }
    return String(aVal).localeCompare(String(bVal)) * multiplier
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                { key: "id", label: "Order ID" },
                { key: "customer", label: "Customer" },
                { key: "total", label: "Total" },
                { key: "status", label: "Status" },
                { key: "date", label: "Date" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort(col.key as keyof Order)}
                >
                  {col.label}
                  {sortField === col.key && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedOrders.slice(0, 20).map((order, index) => (
              <tr
                key={index}
                className={`border-b border-gray-50 transition-colors cursor-pointer ${
                  filaSeleccionada === order.id
                    ? "bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setFilaSeleccionada(
                    filaSeleccionada === order.id ? null : order.id
                  )
                }
              >
                <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.customer}
                  </div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatearMoneda(order.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${obtenerClaseEstado(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatearFecha(order.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-100">
        Showing {Math.min(20, sortedOrders.length)} of {sortedOrders.length}{" "}
        orders
      </div>
    </div>
  )
}
