import { DollarSign, Coins, QrCode, Clock } from "lucide-react"
import { payments } from "@/features/employee-dashboard/data/payments"

export function PaymentSummaryCards() {
  const totalVerified = payments
    .filter((p) => p.status === "verified")
    .reduce((sum, p) => sum + p.amount, 0)

  const cashVerifiedTotal = payments
    .filter((p) => p.status === "verified" && p.method === "cash")
    .reduce((sum, p) => sum + p.amount, 0)

  const gcashVerifiedTotal = payments
    .filter((p) => p.status === "verified" && p.method === "gcash")
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingCount = payments.filter((p) => p.status === "pending").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Verified */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-600 transition-all duration-200">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Total Verified Sales
          </p>
          <p className="text-xl font-black text-slate-800 font-mono">
            ₱{totalVerified.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-sm">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>

      {/* Cash total */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-600 transition-all duration-200">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Cash Volume
          </p>
          <p className="text-xl font-black text-slate-800 font-mono">
            ₱{cashVerifiedTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-200 shadow-sm">
          <Coins className="w-5 h-5" />
        </div>
      </div>

      {/* GCash volume */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-600 transition-all duration-200">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            GCash Volume
          </p>
          <p className="text-xl font-black text-slate-800 font-mono">
            ₱{gcashVerifiedTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 shadow-sm">
          <QrCode className="w-5 h-5" />
        </div>
      </div>

      {/* Pending Validation */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-500 transition-all duration-200">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Pending Validation
          </p>
          <p className="text-xl font-bold text-slate-800">{pendingCount} transactions</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-sm">
          <Clock className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
