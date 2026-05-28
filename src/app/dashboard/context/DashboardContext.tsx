"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { DashboardData, FilterOptions } from "@/app/dashboard/types"
import { DASHBOARD_DATA } from "@/data/mock-data"

interface DashboardContextValue {
  datosDelDashboard: DashboardData
  actualizarDatos: (data: Partial<DashboardData>) => void
  configuracionUsuario: ConfiguracionUsuario
  isLoading: boolean
  filters: FilterOptions
  setFilters: (filters: FilterOptions) => void
}

interface ConfiguracionUsuario {
  nombre: string
  avatar: string
  rol: string
  notificaciones: number
}

const defaultFilters: FilterOptions = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 0,
  sortBy: "name",
  sortOrder: "asc",
}

const defaultContext: DashboardContextValue = {
  datosDelDashboard: DASHBOARD_DATA,
  actualizarDatos: () => {},
  configuracionUsuario: {
    nombre: "Jonathan Navas",
    avatar: "JN",
    rol: "Admin",
    notificaciones: 3,
  },
  isLoading: false,
  filters: defaultFilters,
  setFilters: () => {},
}

export const DashboardContext =
  createContext<DashboardContextValue>(defaultContext)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [datosDelDashboard, setDatosDelDashboard] =
    useState<DashboardData>(DASHBOARD_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters)

  const configuracionUsuario: ConfiguracionUsuario = {
    nombre: "Jonathan Navas",
    avatar: "JN",
    rol: "Admin",
    notificaciones: 3,
  }

  const actualizarDatos = useCallback((data: Partial<DashboardData>) => {
    setDatosDelDashboard((prev) => ({ ...prev, ...data }))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setDatosDelDashboard(DASHBOARD_DATA)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [filters])

  return (
    <DashboardContext.Provider
      value={{
        datosDelDashboard,
        actualizarDatos,
        configuracionUsuario,
        isLoading,
        filters,
        setFilters,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardContext(): DashboardContextValue {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within DashboardProvider"
    )
  }
  return context
}
