"use client"

import { useState } from "react"
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { PaymentDetailsModal } from "./payment-details-modal"

interface PaymentRecord {
  id: string
  transaction: string
  amount: string
  method: "CASH" | "GCASH"
  dateTime: string
  branch: string
  status: "Verified" | "Pending"
  customerName?: string
  branchName?: string
  verifiedAt?: string
  verifiedBy?: string
}

const mockPayments: PaymentRecord[] = [
  {
    id: "#P-0001",
    transaction: "TRX-94281",
    amount: "₱35.00",
    method: "CASH",
    dateTime: "5/16/2026, 07:24 PM",
    branch: "B001",
    branchName: "Lourdes Main Branch",
    status: "Verified",
    customerName: "Elena Rodriguez",
    verifiedAt: "5/16/2026, 07:35 PM",
    verifiedBy: "Admin",
  },
  {
    id: "#P-0002",
    transaction: "TRX-94285",
    amount: "₱150.00",
    method: "GCASH",
    dateTime: "5/16/2026, 08:15 PM",
    branch: "B003",
    branchName: "Lourdes 3rd Branch",
    status: "Pending",
    customerName: "Juan Dela Cruz",
  },
  {
    id: "#P-0003",
    transaction: "TRX-94289",
    amount: "₱75.50",
    method: "CASH",
    dateTime: "5/16/2026, 08:45 PM",
    branch: "B001",
    branchName: "Lourdes Main Branch",
    status: "Verified",
    customerName: "Maria Santos",
    verifiedAt: "5/16/2026, 09:00 PM",
    verifiedBy: "Admin",
  },
]

export function PaymentTable() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)

  return (
    <>
      <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-3 bg-muted/20 border-b border-border flex justify-between items-center">
          <h3 className="text-sm font-bold text-foreground">Payment Records</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/10 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date &amp; Time</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPayments.map((payment) => {
                const methodStyles = payment.method === "CASH"
                  ? "bg-primary/10 text-primary"
                  : "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"

                const statusStyles = payment.status === "Verified"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400"

                return (
                  <tr key={payment.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-foreground">{payment.id}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{payment.transaction}</td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground">{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${methodStyles}`}>
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{payment.dateTime}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{payment.branch}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusStyles}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                      >
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
          <p className="text-xs text-muted-foreground font-medium">Showing 1 to 3 of 56 records</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-muted text-xs font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border hover:bg-muted text-xs font-bold">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <PaymentDetailsModal
        isOpen={selectedPayment !== null}
        onClose={() => setSelectedPayment(null)}
        payment={selectedPayment}
      />
    </>
  )
}

