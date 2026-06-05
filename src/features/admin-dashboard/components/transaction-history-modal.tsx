"use client"

import React from "react"
import { X } from "lucide-react"

interface TransactionItem {
  name: string
  qty: number
  price: number
}

interface TransactionDetail {
  id: string
  date: string
  branch: string
  cashier: string
  payment: string
  itemsList: TransactionItem[]
  subtotal: number
  tax: number
  total: string
}

interface TransactionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: TransactionDetail | null
}

export function TransactionHistoryModal({ isOpen, onClose, transaction }: TransactionHistoryModalProps) {
  if (!isOpen || !transaction) return null

  const formatPrice = (value: number) => `\u20B1${value.toFixed(2)}`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] animate-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-border flex items-start justify-between bg-muted/20">
          <div>
            <h2 className="text-lg font-bold text-foreground">Transaction Details</h2>
            <p className="text-sm text-muted-foreground font-mono">{transaction.id}</p>
          </div>
          <button
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1 border-t border-border py-4 pr-2">
              <p className="text-xs text-muted-foreground font-medium">Date &amp; Time</p>
              <p className="text-sm text-foreground">{transaction.date}</p>
            </div>
            <div className="flex flex-col gap-1 border-t border-border py-4 pl-2">
              <p className="text-xs text-muted-foreground font-medium">Branch</p>
              <p className="text-sm text-foreground">{transaction.branch}</p>
            </div>
            <div className="flex flex-col gap-1 border-t border-border py-4 pr-2">
              <p className="text-xs text-muted-foreground font-medium">Cashier</p>
              <p className="text-sm text-foreground">{transaction.cashier}</p>
            </div>
            <div className="flex flex-col gap-1 border-t border-border py-4 pl-2">
              <p className="text-xs text-muted-foreground font-medium">Payment Method</p>
              <span className="inline-flex items-center px-2 py-0.5 mt-0.5 rounded text-[10px] font-bold uppercase w-fit bg-primary/10 text-primary">
                {transaction.payment}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Itemized Items</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-muted/10 border-b border-border">
                  <tr className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3 w-[60%]">Item</th>
                    <th className="px-4 py-3 text-center w-[20%]">Qty</th>
                    <th className="px-4 py-3 text-right w-[20%]">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-foreground">
                  {transaction.itemsList.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3 text-center font-medium">{item.qty}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatPrice(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-1.5">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="text-sm text-foreground">{formatPrice(transaction.subtotal)}</p>
            </div>
            <div className="flex justify-between py-1.5">
              <p className="text-sm text-muted-foreground">Tax</p>
              <p className="text-sm text-foreground">{formatPrice(transaction.tax)}</p>
            </div>
            <div className="flex justify-between py-2 border-t border-border">
              <p className="text-sm font-bold text-foreground">Total Amount</p>
              <p className="text-lg font-bold text-primary">{transaction.total}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end">
          <button
            type="button"
            className="h-11 px-6 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted transition-all"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
