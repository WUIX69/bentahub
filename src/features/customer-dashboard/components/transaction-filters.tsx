"use client"

import { Search } from "lucide-react"

export function TransactionFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search */}
      <div className="md:col-span-2 bg-card border border-border rounded-xl p-4 shadow-sm flex items-center gap-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by Order ID or product..."
          className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground"
        />
      </div>

      {/* Date Range */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-center">
        <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          Date Range
        </label>
        <select className="bg-transparent border-0 outline-none text-sm font-medium text-foreground cursor-pointer">
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Year 2026</option>
          <option>All Time</option>
        </select>
      </div>

      {/* Status */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-center">
        <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
          Status
        </label>
        <select className="bg-transparent border-0 outline-none text-sm font-medium text-foreground cursor-pointer">
          <option>All Statuses</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Cancelled</option>
        </select>
      </div>
    </div>
  )
}
