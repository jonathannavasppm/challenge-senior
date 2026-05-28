import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products — ShopMetrics",
  description: "Manage products",
}

export default function ProductsPage() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-500">Products section - Coming soon</p>
      </div>
    </div>
  )
}
