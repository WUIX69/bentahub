"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { ReceiptModal } from "./receipt-modal"
import type { Transaction } from "@/types/cashier"

const EMPLOYEE_ITEMS_PER_PAGE = 5
const CUSTOMER_ITEMS_PER_PAGE = 10

const employeeTransactions: Transaction[] = [
  {
    id: "TXN-1001",
    date: "2026-05-22T08:15:30Z",
    items: [
      { productId: "prod-001", name: "Premium Jasmine Rice (5kg)", qty: 2, price: 345.0 },
      { productId: "prod-002", name: "Refined White Sugar (1kg)", qty: 3, price: 82.5 },
    ],
    subtotal: 937.5, discount: 0, total: 937.5,
    paymentMethod: "cash", amountPaid: 1000.0, change: 62.5,
    cashier: "Ron Lim", status: "completed",
  },
  {
    id: "TXN-1002",
    date: "2026-05-22T08:42:10Z",
    items: [
      { productId: "prod-005", name: "Instant Coffee Jar (200g)", qty: 1, price: 189.0 },
      { productId: "prod-006", name: "Fresh Whole Milk (1L)", qty: 2, price: 98.0 },
    ],
    subtotal: 385.0, discount: 0, total: 385.0,
    paymentMethod: "gcash", amountPaid: 385.0, change: 0.0,
    cashier: "Ron Lim", status: "completed",
  },
  {
    id: "TXN-1003",
    date: "2026-05-22T09:05:45Z",
    items: [
      { productId: "prod-003", name: "Moisturizing Soap (135g)", qty: 5, price: 48.0 },
      { productId: "prod-012", name: "Potato Chips (150g)", qty: 2, price: 78.0 },
    ],
    subtotal: 396.0, discount: 20.0, total: 376.0,
    paymentMethod: "cash", amountPaid: 500.0, change: 124.0,
    cashier: "Ron Lim", status: "completed",
  },
  {
    id: "TXN-1004",
    date: "2026-05-22T09:30:00Z",
    items: [
      { productId: "prod-009", name: "Paracetamol Tablets (500mg x 20)", qty: 1, price: 42.0 },
    ],
    subtotal: 42.0, discount: 0, total: 42.0,
    paymentMethod: "cash", amountPaid: 50.0, change: 8.0,
    cashier: "Ron Lim", status: "completed",
  },
  {
    id: "TXN-1005",
    date: "2026-05-22T10:12:15Z",
    items: [
      { productId: "prod-015", name: "Vitamin C (500mg x 30)", qty: 2, price: 135.0 },
      { productId: "prod-010", name: "Shampoo Sachet (12ml x 12)", qty: 1, price: 72.0 },
    ],
    subtotal: 342.0, discount: 0, total: 342.0,
    paymentMethod: "gcash", amountPaid: 342.0, change: 0,
    cashier: "Ron Lim", status: "completed",
  },
  {
    id: "TXN-1006",
    date: "2026-05-22T11:45:00Z",
    items: [
      { productId: "prod-007", name: "Cheese Crackers (250g)", qty: 10, price: 56.0 },
    ],
    subtotal: 560.0, discount: 50.0, total: 510.0,
    paymentMethod: "cash", amountPaid: 1000.0, change: 490.0,
    cashier: "Ron Lim", status: "voided",
  },
  {
    id: "TXN-1007",
    date: "2026-05-22T13:20:18Z",
    items: [
      { productId: "prod-011", name: "Orange Juice (1L)", qty: 4, price: 125.0 },
    ],
    subtotal: 500.0, discount: 0, total: 500.0,
    paymentMethod: "gcash", amountPaid: 500.0, change: 0,
    cashier: "Ron Lim", status: "completed",
  },
]

type MockTransaction = Omit<Transaction, "status" | "paymentMethod"> & {
  status: string
  paymentMethod: string
}

const customerOrders: MockTransaction[] = [
  {
    id: "ORD-2001",
    date: "2026-05-22T14:30:00Z",
    items: [
      { productId: "prod-001", name: "Premium Jasmine Rice (5kg)", qty: 1, price: 345.0 },
      { productId: "prod-006", name: "Fresh Whole Milk (1L)", qty: 2, price: 98.0 },
    ],
    subtotal: 541.0, discount: 0, total: 541.0,
    paymentMethod: "gcash", amountPaid: 541.0, change: 0,
    cashier: "Online", status: "completed",
  },
  {
    id: "ORD-2002",
    date: "2026-05-21T09:15:00Z",
    items: [
      { productId: "prod-010", name: "Shampoo Sachet (12ml x 12)", qty: 3, price: 72.0 },
    ],
    subtotal: 216.0, discount: 0, total: 216.0,
    paymentMethod: "cash", amountPaid: 216.0, change: 0,
    cashier: "Online", status: "completed",
  },
  {
    id: "ORD-2003",
    date: "2026-05-19T16:45:00Z",
    items: [
      { productId: "prod-005", name: "Instant Coffee Jar (200g)", qty: 1, price: 189.0 },
      { productId: "prod-007", name: "Cheese Crackers (250g)", qty: 2, price: 56.0 },
      { productId: "prod-012", name: "Potato Chips (150g)", qty: 1, price: 78.0 },
    ],
    subtotal: 379.0, discount: 25.0, total: 354.0,
    paymentMethod: "gcash", amountPaid: 354.0, change: 0,
    cashier: "Online", status: "completed",
  },
  {
    id: "ORD-2004",
    date: "2026-05-15T11:00:00Z",
    items: [
      { productId: "prod-015", name: "Vitamin C (500mg x 30)", qty: 1, price: 135.0 },
    ],
    subtotal: 135.0, discount: 0, total: 135.0,
    paymentMethod: "gcash", amountPaid: 135.0, change: 0,
    cashier: "Online", status: "voided",
  },
  {
    id: "ORD-2005",
    date: "2026-05-12T08:30:00Z",
    items: [
      { productId: "prod-009", name: "Paracetamol Tablets (500mg x 20)", qty: 2, price: 42.0 },
      { productId: "prod-003", name: "Moisturizing Soap (135g)", qty: 3, price: 48.0 },
    ],
    subtotal: 228.0, discount: 0, total: 228.0,
    paymentMethod: "cash", amountPaid: 250.0, change: 22.0,
    cashier: "Online", status: "pending" as Transaction["status"],
  },
]

const statusBadge = (status: string) => {
  if (status === "completed")
    return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
  if (status === "voided")
    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
  if (status === "pending")
    return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
  return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
}

export function TransactionsList() {
  const { user } = useAuth()
  const role = (user?.role ?? "customer") as "employee" | "customer"

  const [searchQuery, setSearchQuery] = useState("")
  const [methodFilter, setMethodFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null)

  const data = role === "employee" ? employeeTransactions : customerOrders
  const perPage = role === "employee" ? EMPLOYEE_ITEMS_PER_PAGE : CUSTOMER_ITEMS_PER_PAGE

  const filteredTransactions = useMemo(() => {
    return data.filter((t) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.cashier.toLowerCase().includes(q) ||
        t.items.some((i) => i.name.toLowerCase().includes(q))

      const matchesMethod =
        methodFilter === "All" || t.paymentMethod === methodFilter.toLowerCase()

      const matchesStatus =
        statusFilter === "All" || t.status === statusFilter.toLowerCase()

      return matchesSearch && matchesMethod && matchesStatus
    })
  }, [data, searchQuery, methodFilter, statusFilter])

  const totalItems = filteredTransactions.length
  const totalPages = Math.ceil(totalItems / perPage) || 1
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * perPage
  const paginated = filteredTransactions.slice(startIndex, startIndex + perPage)

  return (
    <>
      <ReceiptModal transaction={selectedTxn} onClose={() => setSelectedTxn(null)} />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder={
                role === "employee"
                  ? "Search by ID or cashier..."
                  : "Search by ID or product..."
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={methodFilter}
              onChange={(e) => {
                setMethodFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">Payment: All</option>
              <option value="Cash">Cash</option>
              <option value="GCash">GCash</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 bg-background border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">Status: All</option>
              <option value="Completed">Completed</option>
              <option value="Voided">Voided</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {role === "customer" && (
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Last 30 days
            </span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Transaction ID
                </th>
                {role === "employee" && (
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Cashier
                  </th>
                )}
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Items
                </th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Method
                </th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={role === "employee" ? 8 : 7}
                    className="p-8 text-center text-xs text-muted-foreground"
                  >
                    No transactions matched your filters
                  </td>
                </tr>
              ) : (
                paginated.map((t) => {
                  const dateObj = new Date(t.date)
                  const formattedDate = dateObj.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  const formattedTime = dateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  const itemsCount = t.items.reduce((sum, i) => sum + i.qty, 0)

                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-xs text-muted-foreground font-medium font-mono">
                        <div>{formattedDate}</div>
                        <div className="text-[10px] text-muted-foreground/60">
                          {formattedTime}
                        </div>
                      </td>

                      <td className="p-4 text-xs font-mono font-bold text-foreground">
                        {t.id}
                      </td>

                      {role === "employee" && (
                        <td className="p-4 text-xs text-muted-foreground font-medium">
                          {t.cashier}
                        </td>
                      )}

                      <td className="p-4 text-xs text-muted-foreground font-medium">
                        {itemsCount} {itemsCount === 1 ? "item" : "items"}
                      </td>

                      <td className="p-4 text-xs">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border",
                            t.paymentMethod === "gcash"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                              : "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
                          )}
                        >
                          {t.paymentMethod}
                        </span>
                      </td>

                      <td className="p-4 text-sm font-mono font-black text-foreground">
                        ₱{t.total.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border",
                            statusBadge(t.status)
                          )}
                        >
                          {t.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedTxn(t as Transaction)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium font-mono">
            Showing {totalItems > 0 ? startIndex + 1 : 0}-
            {Math.min(totalItems, safePage * perPage)} of {totalItems}{" "}
            transactions
          </p>

          <div className="flex items-center gap-1.5">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((c) => c - 1)}
              className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:hover:bg-background"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-muted-foreground px-2 font-mono">
              Page {safePage} of {totalPages}
            </span>

            <button
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((c) => c + 1)}
              className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:hover:bg-background"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
