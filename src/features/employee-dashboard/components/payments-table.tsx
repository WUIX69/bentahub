"use client"

import { useState, useMemo } from "react"
import { Search, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { payments as initialPayments } from "@/features/employee-dashboard/data/payments"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 5

export function PaymentsTable() {
  const [paymentsList, setPaymentsList] = useState(initialPayments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  // Filtered dataset
  const filteredPayments = useMemo(() => {
    return paymentsList.filter((p) => {
      const matchesSearch =
        p.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.customerName || "").toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === "All" || p.status === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [paymentsList, searchQuery, statusFilter])

  // Pagination calculations
  const totalItems = filteredPayments.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1
  const safePage = Math.min(currentPage, totalPages)

  const paginatedPayments = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE
    return filteredPayments.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredPayments, safePage])

  // Approve action to verify transaction
  const handleVerify = (paymentId: string) => {
    setPaymentsList((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "verified" } : p))
    )
    alert("Payment verified successfully!")
  }

  // Reject/Fail action
  const handleReject = (paymentId: string) => {
    setPaymentsList((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "failed" } : p))
    )
    alert("Payment flagged as failed/unverified.")
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
      {/* Top Search & Filter Headers */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by reference, txn ID or name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
          {["All", "Verified", "Pending", "Failed"].map((status) => {
            const isActive = statusFilter === status
            return (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setCurrentPage(1)
                }}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-bold transition-all select-none",
                  isActive
                    ? "bg-white text-blue-600 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date/Time</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction ID</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reference No.</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Method</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedPayments.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-xs text-slate-400">
                  No payment verification logs found
                </td>
              </tr>
            ) : (
              paginatedPayments.map((p) => {
                const dateObj = new Date(p.date)
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                const formattedTime = dateObj.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })

                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Date/Time */}
                    <td className="p-4 text-xs text-slate-500 font-medium">
                      <div>{formattedDate}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{formattedTime}</div>
                    </td>

                    {/* Transaction ID */}
                    <td className="p-4 text-xs font-mono font-bold text-slate-700">
                      {p.transactionId}
                    </td>

                    {/* Reference # */}
                    <td className="p-4 text-xs font-mono text-slate-600">
                      {p.referenceNumber}
                    </td>

                    {/* Customer */}
                    <td className="p-4 text-xs text-slate-600 font-medium">
                      {p.customerName || "Walk-in"}
                    </td>

                    {/* Method */}
                    <td className="p-4 text-xs">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                          p.method === "gcash"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"
                        )}
                      >
                        {p.method}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="p-4 text-sm font-mono font-black text-slate-800">
                      ₱{p.amount.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs",
                          p.status === "verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : p.status === "pending"
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        )}
                      >
                        {p.status === "verified" ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Verified</span>
                          </>
                        ) : p.status === "pending" ? (
                          <>
                            <AlertCircle className="w-3 h-3 text-indigo-600 animate-pulse" />
                            <span>Pending</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-600" />
                            <span>Failed</span>
                          </>
                        )}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      {p.status === "pending" ? (
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => handleVerify(p.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700 transition-colors shadow-2xs"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleReject(p.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 transition-colors shadow-2xs"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => alert(`Details for Payment ID: ${p.id}`)}
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          View Log
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

      {/* Pagination Controls */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between mt-auto">
        <p className="text-xs text-slate-400 font-medium font-mono">
          Showing {Math.min(totalItems, (safePage - 1) * ITEMS_PER_PAGE + 1)}-
          {Math.min(totalItems, safePage * ITEMS_PER_PAGE)} of {totalItems} payments
        </p>

        <div className="flex items-center gap-1.5">
          <button
            disabled={safePage === 1}
            onClick={() => setCurrentPage((c) => c - 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-slate-600 px-2 font-mono">
            Page {safePage} of {totalPages}
          </span>

          <button
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage((c) => c + 1)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:hover:bg-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
