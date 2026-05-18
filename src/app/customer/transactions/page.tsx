"use client"

import { 
  TransactionFilters, 
  TransactionTable 
} from "@/features/customer-dashboard"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Transaction History
          </h1>
          <p className="text-muted-foreground mt-1">
            View and download your past orders and payments.
          </p>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionTable />
    </div>
  )
}
