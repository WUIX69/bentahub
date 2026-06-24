"use client"

import { useState, useMemo } from "react"
import {
  Search,
  CreditCard,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Package,
  XCircle,
  Banknote,
  FileDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface InventoryRow {
  productId: string
  productName: string
  category: string
  totalQuantity: number
  reorderLevel: number
  status: "Active" | "Low Stock" | "Critical"
  lastUpdated: string
}

interface AlertItem {
  type: "critical" | "warning" | "success"
  title: string
  description: string
}

interface LiveTransaction {
  id: string
  date: string
  cashier: string
  items: number
  total: number
  payment: "CASH" | "GCASH"
  status: "Completed" | "Voided" | "Pending"
}

const mockInventory: InventoryRow[] = [
  { productId: "P001", productName: "Premium Jasmine Rice (5kg)", category: "Groceries", totalQuantity: 48, reorderLevel: 20, status: "Active", lastUpdated: "5/16/2026" },
  { productId: "P002", productName: "Refined White Sugar (1kg)", category: "Groceries", totalQuantity: 3, reorderLevel: 15, status: "Critical", lastUpdated: "5/15/2026" },
  { productId: "P003", productName: "Cooking Oil (1L)", category: "Groceries", totalQuantity: 12, reorderLevel: 10, status: "Low Stock", lastUpdated: "5/16/2026" },
  { productId: "P004", productName: "Fresh Milk (1L)", category: "Beverages", totalQuantity: 22, reorderLevel: 10, status: "Active", lastUpdated: "5/16/2026" },
  { productId: "P005", productName: "Dishwashing Liquid", category: "Household", totalQuantity: 8, reorderLevel: 10, status: "Low Stock", lastUpdated: "5/14/2026" },
]

const mockAlerts: AlertItem[] = [
  { type: "critical", title: "Stock Critical: Refined White Sugar", description: "Only 3 units across all branches. Reorder level: 15." },
  { type: "warning", title: "Low Stock Alert", description: "2 products are running low. Review reorder levels." },
  { type: "success", title: "Stock Sync Successful", description: "All 3 branches synchronized at 11:45 PM." },
]

const mockLiveTransactions: LiveTransaction[] = [
  { id: "#TXN-00001", date: "5/16/2026, 10:32 AM", cashier: "Cashier 2", items: 3, total: 510.00, payment: "CASH", status: "Completed" },
  { id: "#TXN-00002", date: "5/16/2026, 10:45 AM", cashier: "Cashier 1", items: 5, total: 1240.00, payment: "GCASH", status: "Completed" },
  { id: "#TXN-00003", date: "5/16/2026, 11:15 AM", cashier: "Cashier 3", items: 2, total: 185.00, payment: "CASH", status: "Voided" },
  { id: "#TXN-00004", date: "5/16/2026, 11:30 AM", cashier: "Cashier 2", items: 4, total: 720.00, payment: "GCASH", status: "Completed" },
]

const mockBranches = [
  { id: "all", name: "All Branches" },
  { id: "B001", name: "Makati" },
  { id: "B002", name: "Quezon City" },
  { id: "B003", name: "Cebu" },
]

export function MonitoringDashboard() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTxn, setExpandedTxn] = useState<string | null>(null)

  const todayStats = useMemo(() => {
    const completed = mockLiveTransactions.filter((t) => t.status === "Completed")
    const revenue = completed.reduce((sum, t) => sum + t.total, 0)
    const voided = mockLiveTransactions.filter((t) => t.status === "Voided").length
    return { revenue, voided, total: mockLiveTransactions.length }
  }, [])

  const filteredInventory = useMemo(() => {
    if (!searchQuery.trim()) return mockInventory
    const q = searchQuery.toLowerCase()
    return mockInventory.filter(
      (item) =>
        item.productName.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const handleExportCSV = () => {}
  const handleExportPDF = () => {}

  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <span className="flex items-center text-green-600 font-bold text-[11px] bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full">
                +0%
              </span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Total Stock Value</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">₱45,920.00</h3>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-destructive transition-all duration-300 border-l-4 border-l-destructive">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span className="flex items-center text-destructive font-bold text-[11px] bg-destructive/10 px-3 py-1 rounded-full uppercase tracking-widest font-black">
                Warning
              </span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Low Stock Items</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">3</h3>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                <Calendar className="h-6 w-6" />
              </div>
              <span className="flex items-center text-muted-foreground font-bold text-[11px] bg-muted px-3 py-1 rounded-full">
                0 Today
              </span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Pending Reservations</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">12</h3>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {mockBranches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <button onClick={handleExportCSV} className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-xs font-bold hover:bg-muted transition-colors">
            <FileDown className="h-4 w-4" /> CSV
          </button>
          <button onClick={handleExportPDF} className="inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-xs font-bold hover:bg-muted transition-colors">
            <FileDown className="h-4 w-4" /> PDF
          </button>
        </div>

        <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
              {filteredInventory.length} products tracked
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Total Quantity</th>
                  <th className="px-6 py-4">Reorder Level</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInventory.map((item) => {
                  const statusColor = {
                    Active: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
                    "Low Stock": "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
                    Critical: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
                  }[item.status]

                  return (
                    <tr key={item.productId} className="hover:bg-primary/5 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 font-bold text-sm text-foreground">{item.productName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                      <td className="px-6 py-4 font-mono text-sm text-foreground">{item.totalQuantity}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.reorderLevel}</td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest", statusColor)}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">{item.lastUpdated}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col overflow-hidden h-[380px]">
          <div className="p-6 bg-muted/20 border-b border-border">
            <h4 className="font-bold text-lg text-foreground">System Alerts</h4>
          </div>
          <div className="p-6 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            {mockAlerts.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No alerts</p>
            )}
            {mockAlerts.map((alert, i) => {
              const iconMap = { critical: AlertTriangle, warning: AlertTriangle, success: TrendingUp } as const
              const Icon = iconMap[alert.type]
              const borderMap = { critical: "border-l-destructive", warning: "border-l-amber-500", success: "border-l-green-500" }
              const bgMap = {
                critical: "bg-destructive/5 dark:bg-destructive/10",
                warning: "bg-amber-500/5 dark:bg-amber-500/10",
                success: "bg-green-500/5 dark:bg-green-500/10",
              }
              const iconMapColors = { critical: "text-destructive", warning: "text-amber-500", success: "text-green-500" }

              return (
                <div key={i} className={cn("p-4 rounded flex gap-4", bgMap[alert.type], "border-l-4", borderMap[alert.type])}>
                  <Icon className={cn("h-5 w-5 shrink-0", iconMapColors[alert.type])} />
                  <div>
                    <p className="text-xs font-bold text-foreground">{alert.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{alert.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Today&apos;s Transactions</span>
            <CreditCard className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-3xl font-extrabold text-foreground">{todayStats.total}</h3>
            <span className="text-xs font-medium text-green-500">{todayStats.total} processed today</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Today&apos;s Revenue</span>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-3xl font-extrabold text-foreground">₱{todayStats.revenue.toFixed(2)}</h3>
            <span className="text-xs font-medium text-green-500">Completed transactions</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Voided Today</span>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-3xl font-extrabold text-foreground">{todayStats.voided}</h3>
            <span className={`text-xs font-medium ${todayStats.voided > 0 ? "text-red-500" : "text-green-500"}`}>
              {todayStats.voided > 0 ? "Needs review" : "All clear"}
            </span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Inventory Items</span>
            <Package className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-3xl font-extrabold text-foreground">{mockInventory.length}</h3>
            <span className="text-xs font-medium text-amber-500">Across all categories</span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">Live Transaction Feed</h3>
          <p className="text-[11px] text-muted-foreground">Real-time updates from your register</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border">
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date/Time</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction ID</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Cashier</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Items</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {mockLiveTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-muted-foreground">No transactions yet today</td>
                </tr>
              ) : (
                mockLiveTransactions.map((t) => {
                  const isExpanded = expandedTxn === t.id
                  const isVoided = t.status === "Voided"

                  return (
                    <>
                      <tr
                        key={t.id}
                        className="hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setExpandedTxn(isExpanded ? null : t.id)}
                      >
                        <td className="p-4 text-xs text-muted-foreground font-medium font-mono">{t.date}</td>
                        <td className="p-4 text-xs font-mono font-bold text-foreground">{t.id}</td>
                        <td className="p-4 text-xs text-muted-foreground font-medium">{t.cashier}</td>
                        <td className="p-4 text-xs text-muted-foreground">{t.items} items</td>
                        <td className="p-4 text-xs">
                          <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border", t.payment === "GCASH" ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400")}>
                            {t.payment === "GCASH" ? <CreditCard className="w-3 h-3" /> : <Banknote className="w-3 h-3" />}
                            {t.payment}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-mono font-bold text-foreground">₱{t.total.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border", isVoided ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400" : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400")}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${t.id}-detail`}>
                          <td colSpan={8} className="p-4 bg-muted/10 border-b border-border">
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p><span className="font-bold text-foreground">Transaction:</span> {t.id}</p>
                              <p><span className="font-bold text-foreground">Payment Method:</span> {t.payment}</p>
                              <p><span className="font-bold text-foreground">Total:</span> <span className="font-mono">₱{t.total.toFixed(2)}</span></p>
                              <p><span className="font-bold text-foreground">Status:</span> {t.status}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
