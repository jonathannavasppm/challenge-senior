import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ShopMetrics — Dashboard",
  description: "E-commerce analytics dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-50">{children}</body>
    </html>
  )
}
