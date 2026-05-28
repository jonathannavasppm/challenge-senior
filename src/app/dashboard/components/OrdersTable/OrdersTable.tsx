"use client"

import { useState, useMemo } from "react"
import type { Order } from "@/app/dashboard/types"
import { formatCurrency, formatDate } from "@/app/dashboard/utils/formatters"
import { sortByField, getStatusClass } from "@/app/dashboard/utils/helpers"
import { useDebounce } from "@/app/dashboard/hooks/useDebounce"
import { ORDER_COLUMNS, MAX_VISIBLE_ORDERS } from "./const"

interface OrdersTableProps {
  orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [sortField, setSortField] = useState<keyof Order>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm)

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.customer
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          order.id
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
      ),
    [orders, debouncedSearch]
  )

  const sortedOrders = sortByField(filteredOrders, sortField, sortDirection)

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
          aria-label="Search orders by customer or order ID"
          className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {ORDER_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort(col.key)}
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
            {sortedOrders.slice(0, MAX_VISIBLE_ORDERS).map((order) => (
              <tr
                key={order.id}
                tabIndex={0}
                role="button"
                aria-pressed={selectedRow === order.id}
                className={`border-b border-gray-50 transition-colors cursor-pointer ${
                  selectedRow === order.id
                    ? "bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setSelectedRow(selectedRow === order.id ? null : order.id)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedRow(selectedRow === order.id ? null : order.id)
                  }
                }}
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
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-100">
        Showing {Math.min(MAX_VISIBLE_ORDERS, sortedOrders.length)} of{" "}
        {sortedOrders.length} orders
      </div>
    </div>
  )
}
