"use client"

import { useState, useMemo } from "react"
import {
  TrendingUp, CheckCircle2, Clock, AlertTriangle,
  Search, SlidersHorizontal, Eye, ChevronLeft, ChevronRight,
  Package, CreditCard, XCircle,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

type Tab = "payments" | "pickups"

interface PaymentItem {
  id: string
  transactionId: string
  referenceNumber: string
  method: "cash" | "gcash"
  amount: number
  status: "pending" | "verified" | "failed"
  date: string
  customerName?: string
}

interface PickupItem {
  id: string
  customerName: string
  customerEmail?: string
  code: string
  branch?: string
  items?: string
  date: string
  status: "ready" | "completed" | "delayed"
}

const mockPayments: PaymentItem[] = [
  { id: "#P-0001", transactionId: "TRX-94281", referenceNumber: "GC-2213-7781", method: "cash", amount: 35.00, status: "verified", date: "2026-05-16T19:24:00", customerName: "Elena Rodriguez" },
  { id: "#P-0002", transactionId: "TRX-94285", referenceNumber: "GC-4432-1089", method: "gcash", amount: 150.00, status: "pending", date: "2026-05-16T20:15:00", customerName: "Juan Dela Cruz" },
  { id: "#P-0003", transactionId: "TRX-94289", referenceNumber: "CA-0234-5567", method: "cash", amount: 75.50, status: "pending", date: "2026-05-16T20:45:00", customerName: "Maria Santos" },
  { id: "#P-0004", transactionId: "TRX-94292", referenceNumber: "GC-1298-4410", method: "gcash", amount: 220.00, status: "pending", date: "2026-05-16T21:10:00", customerName: "Antonio Luna" },
]

const mockPickups: PickupItem[] = [
  { id: "#ORD-9021", customerName: "Marcus Thorne", customerEmail: "m.bentahub@example.com", code: "PK-9021", branch: "Lourdes Main Branch", items: "4 units", date: "2026-05-20T14:30:00", status: "ready" },
  { id: "#ORD-8945", customerName: "Elena Reyes", customerEmail: "e.reyes@example.com", code: "PK-8945", branch: "Lourdes 3rd Branch", items: "12 units", date: "2026-05-19T11:00:00", status: "ready" },
  { id: "#ORD-8912", customerName: "Pedro Santos", customerEmail: "p.santos@example.com", code: "PK-8912", branch: "Lourdes Main Branch", items: "2 units", date: "2026-05-18T09:00:00", status: "completed" },
  { id: "#ORD-8878", customerName: "Maria Lopez", customerEmail: "m.lopez@example.com", code: "PK-8878", branch: "Lourdes Main Branch", items: "8 units", date: "2026-05-17T16:00:00", status: "delayed" },
]

export function PickupsManager() {
  const { user, isLoading } = useAuth()
  const role = user?.role ?? "employee"

  const [payments, setPayments] = useState<PaymentItem[]>(mockPayments)
  const [pickups, setPickups] = useState<PickupItem[]>(mockPickups)
  const [activeTab, setActiveTab] = useState<Tab>("payments")
  const [paymentSearch, setPaymentSearch] = useState("")
  const [pickupSearch, setPickupSearch] = useState("")
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  const filteredPayments = useMemo(() => {
    const q = paymentSearch.toLowerCase()
    return payments.filter((p) =>
      p.id.toLowerCase().includes(q) ||
      p.referenceNumber.toLowerCase().includes(q) ||
      (p.customerName?.toLowerCase().includes(q) ?? false),
    )
  }, [payments, paymentSearch])

  const filteredPickups = useMemo(() => {
    const q = pickupSearch.toLowerCase()
    return pickups.filter((p) =>
      p.id.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q),
    )
  }, [pickups, pickupSearch])

  const handleVerifyPayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "verified" as const } : p)),
    )
    setConfirmingId(null)
  }

  const handleCompletePickup = (pickupId: string) => {
    setPickups((prev) =>
      prev.map((p) => (p.id === pickupId ? { ...p, status: "completed" as const } : p)),
    )
    setConfirmingId(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading pickups...</p>
      </div>
    )
  }

  // --- Admin View ---
  if (role === "admin") {
    const totalOrders = pickups.length
    const completedCount = pickups.filter((p) => p.status === "completed").length
    const pendingCount = pickups.filter((p) => p.status === "ready").length
    const delayedCount = pickups.filter((p) => p.status === "delayed").length

    return (
      <div className="space-y-6">
        {/* Admin Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Total Orders</p>
            <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">{totalOrders}</h3>
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <TrendingUp className="h-3.5 w-3.5" /> Across all branches
            </div>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Completed</p>
            <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">{completedCount}</h3>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> {totalOrders > 0 ? Math.round((completedCount / totalOrders) * 100) : 0}% success rate
            </div>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Pending</p>
            <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">{pendingCount}</h3>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
              <Clock className="h-3.5 w-3.5" /> Action required
            </div>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-destructive"></div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Delayed</p>
            <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">{delayedCount}</h3>
            <div className="flex items-center gap-1 text-xs font-medium text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" /> Immediate attention
            </div>
          </div>
        </div>

        {/* Admin Pickup Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-border flex flex-col md:flex-row justify-between md:items-center gap-4">
            <h4 className="text-base font-bold text-foreground">Pickup Orders</h4>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search order ID or customer..."
                  value={pickupSearch}
                  onChange={(e) => setPickupSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-64 md:w-72 shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all">
                <SlidersHorizontal className="h-[18px] w-[18px]" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/10 border-b border-border">
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Order ID</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Customer</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Code</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Branch</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold text-center">Items</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Date</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Status</th>
                  <th className="px-6 py-4 text-[11px] text-muted-foreground uppercase tracking-wider font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredPickups.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-xs text-muted-foreground">No pickups found</td>
                  </tr>
                ) : (
                  filteredPickups.map((p) => {
                    const statusStyles = p.status === "ready"
                      ? "bg-accent/50 text-primary border border-primary/20"
                      : p.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    const dotColor = p.status === "ready" ? "bg-primary animate-pulse" : p.status === "completed" ? "bg-emerald-500" : "bg-destructive"

                    return (
                      <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">{p.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground text-sm">{p.customerName}</span>
                            {p.customerEmail && <span className="text-muted-foreground text-xs">{p.customerEmail}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono font-bold text-foreground">{p.code}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{p.branch || "—"}</td>
                        <td className="px-6 py-4 text-sm text-foreground text-center font-medium">{p.items || "—"}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-[10px] ${statusStyles}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                            {p.status === "ready" ? "READY FOR PICKUP" : p.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {p.status === "ready" ? (
                            <button
                              onClick={() => setConfirmingId(p.id)}
                              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold hover:bg-primary/95 transition-colors shadow-xs"
                            >
                              Complete
                            </button>
                          ) : (
                            <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-muted/5">
            <p className="text-xs text-muted-foreground">Showing {filteredPickups.length} of {pickups.length} orders</p>
            <div className="flex items-center gap-1.5">
              <button disabled className="w-9 h-9 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50">
                <ChevronLeft className="h-[18px] w-[18px]" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-primary bg-primary text-primary-foreground font-bold text-xs">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors font-bold text-xs">2</button>
              <button aria-label="Next page" className="w-9 h-9 flex items-center justify-center border border-border rounded text-muted-foreground hover:bg-muted transition-colors">
                <ChevronRight className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Modal (inline) */}
        {confirmingId && (() => {
          const item = pickups.find((p) => p.id === confirmingId)
          if (!item) return null
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-card rounded-xl border border-border shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold text-foreground mb-2">Complete Pickup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Confirm pickup completion for order <span className="font-mono font-bold text-foreground">{item.id}</span>?
                </p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmingId(null)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => handleCompletePickup(item.id)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/95 transition-colors shadow-xs">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    )
  }

  // --- Employee View ---
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col flex-1">
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab("payments")}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors",
              activeTab === "payments" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20",
            )}
          >
            <CreditCard className="w-4 h-4" />
            Payments to Verify
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
              {payments.filter((p) => p.status === "pending").length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("pickups")}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors",
              activeTab === "pickups" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20",
            )}
          >
            <Package className="w-4 h-4" />
            Orders for Pickup
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
              {pickups.filter((p) => p.status === "ready").length}
            </span>
          </button>
        </div>
      </div>

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div className="flex flex-col flex-1">
          <div className="p-4 border-b border-border bg-muted/20">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search payments by ID, reference, or customer..."
                value={paymentSearch}
                onChange={(e) => setPaymentSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/10 border-b border-border">
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment ID</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Reference</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Method</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredPayments.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-xs text-muted-foreground">No payments found</td></tr>
                ) : (
                  filteredPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-xs font-mono font-bold text-foreground">{p.id}</td>
                      <td className="p-4 text-xs text-muted-foreground">{p.customerName || "—"}</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">{p.referenceNumber}</td>
                      <td className="p-4 text-xs">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                          p.method === "gcash" ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800" : "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
                        )}>
                          {p.method}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-mono font-bold text-foreground">₱{p.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                          p.status === "verified" ? "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:border-emerald-800" : p.status === "pending" ? "bg-amber-500/10 text-amber-700 border-amber-200 dark:border-amber-800" : "bg-red-500/10 text-red-700 border-red-200 dark:border-red-800",
                        )}>
                          {p.status === "verified" ? <CheckCircle2 className="w-3 h-3" /> : p.status === "pending" ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {p.status === "pending" ? (
                          <button onClick={() => { setConfirmingId(p.id); handleVerifyPayment(p.id) }} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold hover:bg-primary/95 transition-colors shadow-xs">
                            Verify
                          </button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-medium">Verified</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pickups Tab */}
      {activeTab === "pickups" && (
        <div className="flex flex-col flex-1">
          <div className="p-4 border-b border-border bg-muted/20">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search pickups by ID, customer, or code..."
                value={pickupSearch}
                onChange={(e) => setPickupSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/10 border-b border-border">
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Pickup ID</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Code</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredPickups.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-xs text-muted-foreground">No pickups found</td></tr>
                ) : (
                  filteredPickups.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-xs font-mono font-bold text-foreground">{p.id}</td>
                      <td className="p-4 text-xs text-muted-foreground font-medium">{p.customerName}</td>
                      <td className="p-4 text-xs font-mono font-bold text-foreground">{p.code}</td>
                      <td className="p-4 text-xs text-muted-foreground font-mono">
                        {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                          p.status === "completed" ? "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:border-emerald-800" : p.status === "delayed" ? "bg-red-500/10 text-red-700 border-red-200 dark:border-red-800" : "bg-blue-500/10 text-blue-700 border-blue-200 dark:border-blue-800",
                        )}>
                          {p.status === "completed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {p.status === "ready" ? "Ready" : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {p.status === "ready" ? (
                          <button onClick={() => setConfirmingId(p.id)} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold hover:bg-primary/95 transition-colors shadow-xs">
                            Complete Pickup
                          </button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-medium">Done</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employee confirmation modal */}
      {confirmingId && (() => {
        const paymentItem = payments.find((p) => p.id === confirmingId)
        const pickupItem = pickups.find((p) => p.id === confirmingId)
        const itemName = paymentItem
          ? `payment ${paymentItem.id}`
          : pickupItem
            ? `pickup ${pickupItem.id}`
            : "this item"

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-card rounded-xl border border-border shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-bold text-foreground mb-2">Confirm Action</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Are you sure you want to process {itemName}?
              </p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirmingId(null)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (paymentItem) handleVerifyPayment(confirmingId)
                    if (pickupItem) handleCompletePickup(confirmingId)
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/95 transition-colors shadow-xs"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
