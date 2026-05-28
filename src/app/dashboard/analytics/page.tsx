import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics — ShopMetrics",
  description: "View analytics",
}

export default function AnalyticsPage() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-500">Analytics section - Coming soon</p>
      </div>
    </div>
  )
}
