import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "ShopMetrics — Dashboard",
    template: "%s | ShopMetrics",
  },
  description:
    "E-commerce analytics dashboard for tracking revenue, orders, and product performance",
  openGraph: {
    title: "ShopMetrics — Dashboard",
    description:
      "E-commerce analytics dashboard for tracking revenue, orders, and product performance",
    type: "website",
    locale: "en_US",
    siteName: "ShopMetrics",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopMetrics — Dashboard",
    description:
      "E-commerce analytics dashboard for tracking revenue, orders, and product performance",
  },
  robots: {
    index: true,
    follow: true,
  },
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
