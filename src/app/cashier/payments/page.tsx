"use client"

import { PaymentSummaryCards } from "@/features/cashier-dashboard/components/payment-summary-cards"
import { PaymentsTable } from "@/features/cashier-dashboard/components/payments-table"

export default function PaymentsPage() {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto bg-slate-50">
      {/* Metrics Header widgets */}
      <PaymentSummaryCards />

      {/* Main interactive validation grid */}
      <PaymentsTable />
    </div>
  )
}
