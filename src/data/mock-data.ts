import type {
  Product,
  Order,
  DashboardData,
  RevenueDataPoint,
  Activity,
} from "@/app/dashboard/types"

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
  "Beauty",
  "Automotive",
]

const PRODUCT_NAMES = [
  "Wireless Headphones",
  "Smart Watch",
  "Running Shoes",
  "Coffee Maker",
  "Yoga Mat",
  "Laptop Stand",
  "Bluetooth Speaker",
  "Water Bottle",
  "Desk Lamp",
  "Backpack",
  "Sunglasses",
  "Keyboard",
  "Mouse Pad",
  "Phone Case",
  "USB Hub",
  "Monitor",
  "Webcam",
  "Microphone",
  "Tripod",
  "Charger",
]

const CUSTOMER_NAMES = [
  "Alice Johnson",
  "Bob Martinez",
  "Carol Williams",
  "David Brown",
  "Eva Garcia",
  "Frank Lee",
  "Grace Kim",
  "Henry Davis",
  "Isabel Wilson",
  "James Taylor",
]

const COUNTRIES = ["US", "CA", "UK", "DE", "FR", "AU", "JP", "BR", "MX", "ES"]

function generateProductId(index: number): string {
  return `prod-${String(index).padStart(5, "0")}`
}

function generateProduct(index: number): Product {
  const nameBase = PRODUCT_NAMES[index % PRODUCT_NAMES.length]
  const category = CATEGORIES[index % CATEGORIES.length]
  const price = Math.round((Math.random() * 490 + 10) * 100) / 100
  const originalPrice = Math.round(price * (1 + Math.random() * 0.5) * 100) / 100

  return {
    id: generateProductId(index),
    name: `${nameBase} ${category} Pro ${index + 1}`,
    price,
    originalPrice,
    category,
    image: `https://picsum.photos/seed/${index + 1}/300/300`,
    stock: Math.floor(Math.random() * 500),
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 2000),
    sku: `SKU-${String(index).padStart(6, "0")}`,
  }
}

export const ALL_PRODUCTS: Product[] = Array.from(
  { length: 5000 },
  (_, i) => generateProduct(i)
)

export const TOP_PRODUCTS: Product[] = ALL_PRODUCTS.slice(0, 10)

function generateOrder(index: number): Order {
  const statuses: Order["status"][] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 30))

  return {
    id: `ORD-${String(10000 + index).padStart(6, "0")}`,
    customer: CUSTOMER_NAMES[index % CUSTOMER_NAMES.length],
    email: `user${index}@example.com`,
    total: Math.round((Math.random() * 500 + 20) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    items: Math.floor(Math.random() * 8) + 1,
    date: date.toISOString(),
    country: COUNTRIES[index % COUNTRIES.length],
  }
}

export const RECENT_ORDERS: Order[] = Array.from(
  { length: 50 },
  (_, i) => generateOrder(i)
)

export const REVENUE_DATA: RevenueDataPoint[] = [
  { month: "Jan", revenue: 42000, orders: 380 },
  { month: "Feb", revenue: 38500, orders: 340 },
  { month: "Mar", revenue: 51200, orders: 460 },
  { month: "Apr", revenue: 47800, orders: 420 },
  { month: "May", revenue: 63400, orders: 580 },
  { month: "Jun", revenue: 58900, orders: 530 },
  { month: "Jul", revenue: 71200, orders: 640 },
  { month: "Aug", revenue: 68700, orders: 610 },
  { month: "Sep", revenue: 74500, orders: 670 },
  { month: "Oct", revenue: 82100, orders: 740 },
  { month: "Nov", revenue: 91300, orders: 820 },
  { month: "Dec", revenue: 105600, orders: 950 },
]

export const RECENT_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    type: "order",
    message: "New order #ORD-010001 from Alice Johnson — $234.50",
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
  },
  {
    id: "act-2",
    type: "signup",
    message: "New customer signup: bob.martinez@email.com",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "act-3",
    type: "refund",
    message: "Refund processed for order #ORD-009876 — $89.00",
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
  },
  {
    id: "act-4",
    type: "order",
    message: "New order #ORD-010002 from Carol Williams — $512.00",
    timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
  },
  {
    id: "act-5",
    type: "review",
    message: "New 5-star review on Wireless Headphones Electronics Pro 1",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: "act-6",
    type: "order",
    message: "New order #ORD-010003 from David Brown — $78.90",
    timestamp: new Date(Date.now() - 31 * 60000).toISOString(),
  },
  {
    id: "act-7",
    type: "refund",
    message: "Refund requested for order #ORD-009800 — $145.00",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: "act-8",
    type: "signup",
    message: "New customer signup: eva.garcia@email.com",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
  },
]

export const DASHBOARD_DATA: DashboardData = {
  metrics: {
    revenue: 105600,
    orders: 950,
    avgOrderValue: 111.16,
    conversionRate: 3.24,
    revenueChange: 15.7,
    ordersChange: 12.3,
    avgValueChange: 3.1,
    conversionChange: -0.8,
  },
  recentOrders: RECENT_ORDERS,
  topProducts: TOP_PRODUCTS,
  revenueByMonth: REVENUE_DATA,
  activities: RECENT_ACTIVITIES,
}
