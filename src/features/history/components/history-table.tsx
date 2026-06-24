"use client"

import { useState, useMemo } from "react"
import { Search, Download, Eye, ChevronLeft, ChevronRight, TrendingUp, CreditCard, Banknote } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface HistoryItem {
  date: string
  id: string
  branch: string
  cashier: string
  items: string
  itemsList: { name: string; qty: number; price: number }[]
  subtotal: number
  tax: number
  total: string
  payment: "CASH" | "GCASH"
  status: "Completed" | "Pending"
}

const mockData: HistoryItem[] = [
  {
    date: "5/16/2026",
    id: "#TXN-00001",
    branch: "B001 - Makati",
    cashier: "Cashier 2",
    items: "1 items",
    itemsList: [{ name: "Premium Jasmine Rice (5kg)", qty: 1, price: 345.00 }],
    subtotal: 345.00,
    tax: 0,
    total: "₱345.00",
    payment: "CASH",
    status: "Completed",
  },
  {
    date: "5/16/2026",
    id: "#TXN-00002",
    branch: "B003 - Quezon City",
    cashier: "Cashier 1",
    items: "4 items",
    itemsList: [
      { name: "Fresh Milk (1L)", qty: 2, price: 120.00 },
      { name: "Whole Wheat Bread", qty: 1, price: 85.00 },
    ],
    subtotal: 560.00,
    tax: 0,
    total: "₱1,240.00",
    payment: "GCASH",
    status: "Completed",
  },
  {
    date: "5/16/2026",
    id: "#TXN-00003",
    branch: "B001 - Makati",
    cashier: "Cashier 2",
    items: "2 items",
    itemsList: [
      { name: "Cooking Oil (1L)", qty: 1, price: 95.00 },
      { name: "Dishwashing Liquid", qty: 2, price: 45.00 },
    ],
    subtotal: 185.00,
    tax: 0,
    total: "₱520.00",
    payment: "CASH",
    status: "Pending",
  },
  {
    date: "5/16/2026",
    id: "#TXN-00004",
    branch: "B001 - Makati",
    cashier: "Cashier 3",
    items: "3 items",
    itemsList: [
      { name: "Canned Tuna", qty: 3, price: 25.00 },
      { name: "Pancit Canton", qty: 2, price: 18.00 },
    ],
    subtotal: 111.00,
    tax: 0,
    total: "₱111.00",
    payment: "GCASH",
    status: "Completed",
  },
]

export function HistoryTable() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return mockData
    const q = searchQuery.toLowerCase()
    return mockData.filter(
      (t) => t.id.toLowerCase().includes(q) || t.branch.toLowerCase().includes(q) || t.cashier.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const totals = useMemo(() => {
    const total = filtered.length
    const cash = filtered.filter((t) => t.payment === "CASH").length
    const gcash = filtered.filter((t) => t.payment === "GCASH").length
    return { total, cash, gcash }
  }, [filtered])

  const selectedTransaction = useMemo(() => {
    if (!selectedId) return null
    return filtered.find((t) => t.id === selectedId) ?? null
  }, [selectedId, filtered])

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-primary">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Records</span>
            <div className="mt-4">
              <h4 className="text-2xl font-black text-foreground">{totals.total}</h4>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="h-3.5 w-3.5" />
                {isAdmin ? "Cross-branch" : "This branch"}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-amber-500">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Cash Payments</span>
            <div className="mt-4">
              <h4 className="text-2xl font-black text-foreground flex items-center gap-2">
                <Banknote className="h-5 w-5 text-amber-500" />
                {totals.cash}
              </h4>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-emerald-500">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GCash Payments</span>
            <div className="mt-4">
              <h4 className="text-2xl font-black text-foreground flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-500" />
                {totals.gcash}
              </h4>
            </div>
          </div>
        </div>

        <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-3 bg-muted/20 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {isAdmin ? "All Branch Transactions" : "Branch Transactions"}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {isAdmin ? "Real-time update from all active branch registers." : "Real-time update from your branch register."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search ID, Branch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
                />
              </div>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95">
                <Download className="h-[18px] w-[18px]" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/10 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Cashier</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((txn) => {
                  const paymentStyles = txn.payment === "CASH"
                    ? "bg-muted text-muted-foreground"
                    : "bg-accent text-primary"

                  const statusStyles = txn.status === "Completed"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
                    : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"

                  return (
                    <tr key={txn.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{txn.date}</td>
                      <td className="px-6 py-4 font-mono text-sm text-primary">{txn.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{txn.branch}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{txn.cashier}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{txn.items}</td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground">{txn.total}</td>
                      <td className="px-6 py-4">
                        <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", paymentStyles)}>
                          {txn.payment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", statusStyles)}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" onClick={() => setSelectedId(txn.id)}>
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-muted/5 border-t border-border flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-bold text-foreground">1 - {filtered.length}</span> of <span className="font-bold text-foreground">{filtered.length}</span> entries
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors text-muted-foreground">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors text-muted-foreground">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedId(null)}>
          <div className="bg-card rounded-xl border border-border shadow-2xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Transaction Details</h3>
              <button onClick={() => setSelectedId(null)} className="text-muted-foreground hover:text-foreground text-xl leading-none">&times;</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">ID</span><span className="font-mono font-bold text-foreground">{selectedTransaction.id}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span className="text-foreground">{selectedTransaction.branch}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cashier</span><span className="text-foreground">{selectedTransaction.cashier}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-foreground">{selectedTransaction.total}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="font-bold uppercase">{selectedTransaction.payment}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span>{selectedTransaction.status}</span></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
