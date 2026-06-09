"use client"

import { useState, useEffect } from "react"
import { MonitoringMetrics, InventoryStatusTable, SystemAlerts } from "@/features/admin-dashboard"
import { Download } from "lucide-react"
import type { MonitoringData } from "@/types/admin"

export default function MonitoringPage() {
  const [data, setData] = useState<MonitoringData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedBranch, setSelectedBranch] = useState("all")

  useEffect(() => {
    fetch("/api/admin/monitoring")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setData(json.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
              <div className="h-4 w-24 bg-muted rounded mb-4" />
              <div className="h-8 w-32 bg-muted rounded" />
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-6 h-[400px] animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <MonitoringMetrics data={data?.metrics ?? { totalStockValue: { value: "₱0", trend: "0%" }, lowStockItems: { value: 0, severity: "Normal" }, pendingReservations: { value: 0, todayCount: 0 } }} />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="text-sm font-bold text-muted-foreground whitespace-nowrap" htmlFor="branch-select">
            Select Branch:
          </label>
          <select
            id="branch-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full md:w-64 rounded-lg border-border bg-background focus:ring-primary focus:border-primary text-sm p-2.5"
          >
            <option value="all">All Branches</option>
            {(data?.branches ?? []).map((b) => {
              const displayName = b.name
                .replace("Second", "2nd")
                .replace("Third", "3rd")
              return (
                <option key={b.id} value={b.id}>{displayName}</option>
              )
            })}
          </select>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-muted/50 hover:bg-muted rounded-lg border border-border text-sm font-bold transition-all w-full md:w-auto justify-center">
          <Download className="h-[18px] w-[18px]" />
          Export Data
        </button>
      </div>

      <InventoryStatusTable data={data?.inventoryStatus ?? []} />

      <SystemAlerts data={data?.alerts ?? []} />
    </div>
  )
}
