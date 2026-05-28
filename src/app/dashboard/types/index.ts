export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  category: string
  image: string
  stock: number
  rating: number
  reviewCount: number
  sku: string
}

export interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: OrderStatus
  items: number
  date: string
  country: string
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export interface MetricCard {
  title: string
  value: number
  change: number
  prefix?: string
  suffix?: string
}

export interface DashboardData {
  metrics: {
    revenue: number
    orders: number
    avgOrderValue: number
    conversionRate: number
    revenueChange: number
    ordersChange: number
    avgValueChange: number
    conversionChange: number
  }
  recentOrders: Order[]
  topProducts: Product[]
  revenueByMonth: RevenueDataPoint[]
  activities: Activity[]
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  orders: number
}

export interface Activity {
  id: string
  type: "order" | "refund" | "signup" | "review"
  message: string
  timestamp: string
  avatar?: string
}

export interface FilterOptions {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  sortBy: "name" | "price" | "rating" | "stock"
  sortOrder: "asc" | "desc"
}

export interface ProductoFiltrado {
  id: string
  nombre: string
  precio: number
  categoria: string
  descuento: number
}

export type EstadoPedido =
  | "pendiente"
  | "procesando"
  | "enviado"
  | "entregado"
  | "cancelado"

export interface ConfiguracionFiltros {
  terminoBusqueda: string
  categoriaSeleccionada: string
  precioMinimo: number
  precioMaximo: number
  ordenarPor: string
}
