import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings — ShopMetrics",
  description: "Manage settings",
}

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500">Settings section - Coming soon</p>
      </div>
    </div>
  )
}
