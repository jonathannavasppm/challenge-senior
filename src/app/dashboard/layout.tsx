"use client"

import { DashboardProvider } from "@/app/dashboard/context/DashboardContext"
import { Sidebar } from "@/app/dashboard/components/index"
import { Header } from "@/app/dashboard/components/index"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  )
}
