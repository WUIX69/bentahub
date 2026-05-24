"use client"

import { useState } from "react"
import { PaymentPickupList } from "@/features/staff-dashboard/components/payment-pickup-list"
import { staffPayments, staffPickups } from "@/features/staff-dashboard/data/transactions"

export default function PickupPage() {
  const [payments, setPayments] = useState(staffPayments)
  const [pickups, setPickups] = useState(staffPickups)

  const handleVerifyPayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "verified" as const } : p))
    )
    setPickups((prev) => {
      const verifiedPayment = payments.find((p) => p.id === paymentId)
      if (verifiedPayment && !prev.find((pk) => pk.transactionId === verifiedPayment.transactionId)) {
        return [
          ...prev,
          {
            id: `PKP-${verifiedPayment.transactionId.replace("TXN-", "")}`,
            transactionId: verifiedPayment.transactionId,
            customerName: verifiedPayment.customerName || "Unknown",
            code: `PK-${verifiedPayment.referenceNumber.replace("GC-REF-", "")}`,
            date: verifiedPayment.date,
            status: "ready" as const,
          },
        ]
      }
      return prev
    })
  }

  const handleCompletePickup = (pickupId: string) => {
    setPickups((prev) =>
      prev.map((p) => (p.id === pickupId ? { ...p, status: "completed" as const } : p))
    )
  }

  return (
    <div className="space-y-6">
      <PaymentPickupList
        payments={payments}
        pickups={pickups}
        onVerifyPayment={handleVerifyPayment}
        onCompletePickup={handleCompletePickup}
      />
    </div>
  )
}
