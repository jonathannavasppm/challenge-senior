import { DashboardProvider } from "@/app/dashboard/context/DashboardContext"
import { DashboardShell } from "@/app/dashboard/components/DashboardShell"

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  )
}
