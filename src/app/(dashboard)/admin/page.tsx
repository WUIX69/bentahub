"use client"

import { useState, useEffect } from "react"
import { KPICard } from "@/components/ui/kpi-card"
import { SalesChart } from "@/features/analytics"
import { AdminStockTable } from "@/features/products"
import { BranchStockOverview } from "@/features/analytics"
import { CreditCard, Package, AlertTriangle } from "lucide-react"
import type { AdminOverviewData } from "@/types/admin"
import { useAuth } from "@/hooks/useAuth"
import { getAdminOverview } from "@/server/db/get-overview"

export default function AdminPage() {
  const [data, setData] = useState<AdminOverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    getAdminOverview()
      .then((res) => {
        if (res) setData(res)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
              <div className="h-4 w-24 bg-muted rounded mb-4" />
              <div className="h-8 w-32 bg-muted rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-card border border-border rounded-xl p-6 h-[400px] animate-pulse" />
          <div className="lg:col-span-4 bg-card border border-border rounded-xl p-6 h-[400px] animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Revenue"
          value={data?.kpis.totalRevenue.value ?? "₱0.00"}
          trend={data?.kpis.totalRevenue.trend ?? "0%"}
          trendType={data?.kpis.totalRevenue.trendType ?? "up"}
          icon={CreditCard}
        />
        <KPICard
          title="Total Inventory"
          value={data?.kpis.totalInventory.value ?? "0 items"}
          trend={data?.kpis.totalInventory.trend ?? "0 products"}
          trendType={data?.kpis.totalInventory.trendType ?? "up"}
          icon={Package}
        />
        <KPICard
          title="Low Stock Alerts"
          value={`${data?.kpis.lowStockAlerts.value ?? 0} items`}
          trend="Requires attention"
          trendType="warning"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <SalesChart data={data?.salesTrend} />
        </div>
        <div className="lg:col-span-4">
          <BranchStockOverview data={data?.branchStock} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AdminStockTable data={data?.branchStock} />
      </div>
    </div>
  )
}
