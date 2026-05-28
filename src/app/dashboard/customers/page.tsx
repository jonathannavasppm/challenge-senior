import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customers — ShopMetrics",
  description: "Manage customers",
}

export default function CustomersPage() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Customers</h1>
        <p className="text-gray-500">Customers section - Coming soon</p>
      </div>
    </div>
  )
}
