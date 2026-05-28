import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Orders — ShopMetrics",
  description: "Manage orders",
}

export default function OrdersPage() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-500">Orders section - Coming soon</p>
      </div>
    </div>
  )
}
