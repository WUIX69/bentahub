"use client"

import { useState, useMemo } from "react"
import {
  DollarSign, Coins, QrCode, Clock, Search, CheckCircle, XCircle, AlertCircle,
  ChevronLeft, ChevronRight, Eye,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

type PaymentStatus = "pending" | "verified" | "failed"
type PaymentMethod = "cash" | "gcash"

interface PaymentItem {
  id: string
  transactionId: string
  referenceNumber: string
  method: PaymentMethod
  amount: number
  status: PaymentStatus
  date: string
  customerName?: string
  branchName?: string
  verifiedAt?: string
  verifiedBy?: string
}

const mockPayments: PaymentItem[] = [
  { id: "#P-0001", transactionId: "TRX-94281", referenceNumber: "GC-2213-7781", method: "cash", amount: 35.00, status: "verified", date: "2026-05-16T19:24:00", customerName: "Elena Rodriguez", branchName: "Lourdes Main Branch", verifiedAt: "2026-05-16T19:35:00", verifiedBy: "Admin" },
  { id: "#P-0002", transactionId: "TRX-94285", referenceNumber: "GC-4432-1089", method: "gcash", amount: 150.00, status: "pending", date: "2026-05-16T20:15:00", customerName: "Juan Dela Cruz", branchName: "Lourdes 3rd Branch" },
  { id: "#P-0003", transactionId: "TRX-94289", referenceNumber: "CA-0234-5567", method: "cash", amount: 75.50, status: "verified", date: "2026-05-16T20:45:00", customerName: "Maria Santos", branchName: "Lourdes Main Branch", verifiedAt: "2026-05-16T21:00:00", verifiedBy: "Admin" },
  { id: "#P-0004", transactionId: "TRX-94292", referenceNumber: "GC-1298-4410", method: "gcash", amount: 220.00, status: "pending", date: "2026-05-16T21:10:00", customerName: "Antonio Luna" },
  { id: "#P-0005", transactionId: "TRX-94295", referenceNumber: "CA-5561-2390", method: "cash", amount: 45.00, status: "failed", date: "2026-05-16T21:30:00", customerName: "Elena Reyes" },
  { id: "#P-0006", transactionId: "TRX-94298", referenceNumber: "GC-9876-5432", method: "gcash", amount: 310.00, status: "pending", date: "2026-05-16T22:00:00", customerName: "Pedro Santos" },
]

const ITEMS_PER_PAGE = 5

export function PaymentsManager() {
  const { user, isLoading } = useAuth()
  const role = user?.role ?? "employee"

  const [payments, setPayments] = useState<PaymentItem[]>(mockPayments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null)

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        p.id.toLowerCase().includes(q) ||
        p.referenceNumber.toLowerCase().includes(q) ||
        p.transactionId.toLowerCase().includes(q) ||
        (p.customerName?.toLowerCase().includes(q) ?? false)
      const matchesStatus = statusFilter === "all" || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [payments, searchQuery, statusFilter])

  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1
  const safePage = Math.min(currentPage, totalPages)
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE),
    [filtered, safePage],
  )

  const handleVerify = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "verified" as const, verifiedAt: new Date().toISOString(), verifiedBy: user?.fullName ?? "Admin" } : p)),
    )
  }

  const handleReject = (paymentId: string) => {
    setPayments((prev) => prev.map((p) => (p.id === paymentId ? { ...p, status: "failed" as const } : p)))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading payments...</p>
      </div>
    )
  }

  const totalVerified = payments.filter((p) => p.status === "verified").reduce((s, p) => s + p.amount, 0)
  const cashTotal = payments.filter((p) => p.status === "verified" && p.method === "cash").reduce((s, p) => s + p.amount, 0)
  const gcashTotal = payments.filter((p) => p.status === "verified" && p.method === "gcash").reduce((s, p) => s + p.amount, 0)
  const pendingCount = payments.filter((p) => p.status === "pending").length
  const failedCount = payments.filter((p) => p.status === "failed").length

  return (
    <div className="space-y-6">
      {/* KPI Cards - role-adaptive */}
      {role === "admin" ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 border-l-4 border-l-primary">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Payments</span>
            <h4 className="text-2xl font-black text-foreground mt-4 font-mono">₱{totalVerified.toFixed(2)}</h4>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 border-l-4 border-l-teal-500">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Cash</span>
            <h4 className="text-2xl font-black text-foreground mt-4 font-mono">₱{cashTotal.toFixed(2)}</h4>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: cashTotal > 0 ? `${(cashTotal / totalVerified) * 100}%` : "0%" }}></div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 border-l-4 border-l-amber-500">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GCash</span>
            <h4 className="text-2xl font-black text-foreground mt-4 font-mono">₱{gcashTotal.toFixed(2)}</h4>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: gcashTotal > 0 ? `${(gcashTotal / totalVerified) * 100}%` : "0%" }}></div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 border-l-4 border-l-destructive">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Failed</span>
            <h4 className="text-2xl font-black text-foreground mt-4">{failedCount} transactions</h4>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-destructive rounded-full" style={{ width: payments.length > 0 ? `${(failedCount / payments.length) * 100}%` : "0%" }}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center justify-between group hover:border-primary transition-all duration-200">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Verified Sales</p>
              <p className="text-xl font-black text-foreground font-mono">₱{totalVerified.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center justify-between group hover:border-primary transition-all duration-200">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Cash Volume</p>
              <p className="text-xl font-black text-foreground font-mono">₱{cashTotal.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-200">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center justify-between group hover:border-primary transition-all duration-200">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">GCash Volume</p>
              <p className="text-xl font-black text-foreground font-mono">₱{gcashTotal.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
              <QrCode className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-center justify-between group hover:border-primary transition-all duration-200">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Pending Validation</p>
              <p className="text-xl font-bold text-foreground">{pendingCount} transactions</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/20">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search by reference, transaction ID or customer..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-1.5 bg-muted p-1 rounded-lg">
            {["all", "verified", "pending", "failed"].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1) }}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-bold transition-all select-none capitalize",
                  statusFilter === s
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border">
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {role === "admin" ? "Payment ID" : "Date/Time"}
                </th>
                {role === "admin" && (
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction</th>
                )}
                {role !== "admin" && (
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment ID</th>
                )}
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Reference</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                {role === "admin" && <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch</th>}
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={role === "admin" ? 9 : 8} className="p-8 text-center text-xs text-muted-foreground">
                    No payments found
                  </td>
                </tr>
              ) : (
                paginated.map((p) => {
                  const dateObj = new Date(p.date)
                  const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  const formattedTime = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

                  return (
                    <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                      {role === "admin" ? (
                        <td className="p-4 text-xs font-mono font-bold text-foreground">{p.id}</td>
                      ) : (
                        <td className="p-4 text-xs text-muted-foreground">
                          <div>{formattedDate}</div>
                          <div className="text-[10px] text-muted-foreground/60 font-mono">{formattedTime}</div>
                        </td>
                      )}
                      {role === "admin" && (
                        <td className="p-4 text-xs font-mono text-foreground">{p.transactionId}</td>
                      )}
                      {role !== "admin" && (
                        <td className="p-4 text-xs font-mono font-bold text-foreground">{p.id}</td>
                      )}
                      <td className="p-4 text-xs font-mono text-muted-foreground">{p.referenceNumber}</td>
                      <td className="p-4 text-xs text-muted-foreground font-medium">{p.customerName || "—"}</td>
                      <td className="p-4 text-xs">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                          p.method === "gcash" ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800" : "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
                        )}>
                          {p.method}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-mono font-bold text-foreground">₱{p.amount.toFixed(2)}</td>
                      {role === "admin" && (
                        <td className="p-4 text-xs text-muted-foreground">{p.branchName || "—"}</td>
                      )}
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                          p.status === "verified" ? "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:border-emerald-800" : p.status === "pending" ? "bg-amber-500/10 text-amber-700 border-amber-200 dark:border-amber-800" : "bg-red-500/10 text-red-700 border-red-200 dark:border-red-800",
                        )}>
                          {p.status === "verified" ? <CheckCircle className="w-3 h-3" /> : p.status === "pending" ? <AlertCircle className="w-3 h-3 animate-pulse" /> : <XCircle className="w-3 h-3" />}
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {p.status === "pending" ? (
                          <div className="flex gap-1.5 justify-end">
                            <button onClick={() => handleVerify(p.id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700 transition-colors shadow-xs">
                              Verify
                            </button>
                            <button onClick={() => handleReject(p.id)} className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 transition-colors shadow-xs">
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setSelectedPayment(p)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
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

        {/* Pagination */}
        <div className="p-4 bg-muted/5 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium font-mono">
            Showing {Math.min(totalItems, (safePage - 1) * ITEMS_PER_PAGE + 1)}-{Math.min(totalItems, safePage * ITEMS_PER_PAGE)} of {totalItems} payments
          </p>
          <div className="flex items-center gap-1.5">
            <button disabled={safePage === 1} onClick={() => setCurrentPage((c) => c - 1)}
              className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:hover:bg-card">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-muted-foreground px-2 font-mono">Page {safePage} of {totalPages}</span>
            <button disabled={safePage === totalPages} onClick={() => setCurrentPage((c) => c + 1)}
              className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:hover:bg-card">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
