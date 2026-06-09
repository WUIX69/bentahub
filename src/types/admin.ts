export interface KpiData {
  value: string
  trend: string
  trendType: "up" | "down" | "warning"
}

export interface BranchStockData {
  id: string
  name: string
  totalItems: number
  capacity: number
  lowStockItems: number
  percentage: number
  status: "Healthy" | "Warning" | "Critical"
}

export interface SalesTrendData {
  month: string
  revenue: number
}

export interface AdminOverviewData {
  kpis: {
    totalRevenue: KpiData
    totalInventory: KpiData
    lowStockAlerts: { value: number }
  }
  salesTrend: SalesTrendData[]
  branchStock: BranchStockData[]
}

export interface AdminApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}
