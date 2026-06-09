import { TrendingUp, Minus, BarChart3, Loader2 } from "lucide-react"
import type { SalesOverviewData } from "@/types/admin"

interface SalesMetricsProps {
  overview: SalesOverviewData | null
  loading: boolean
}

export function SalesMetrics({ overview, loading }: SalesMetricsProps) {
  if (loading) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-span-1 md:col-span-4 bg-card rounded-xl border border-border shadow-sm p-6 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <div className="col-span-1 md:col-span-4 bg-card rounded-xl border-l-4 border-l-primary border-t border-r border-b border-border shadow-sm p-6 flex flex-col justify-between">
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Sales</span>
        <div className="mt-4">
          <h4 className="text-3xl font-black text-foreground">{overview?.totalSalesDisplay || "₱0.00"}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <TrendingUp className="h-[14px] w-[14px]" />
            {overview?.trend || "0%"} from yesterday
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-4 bg-card rounded-xl border-l-4 border-l-teal-600 border-t border-r border-b border-border shadow-sm p-6 flex flex-col justify-between">
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Transactions</span>
        <div className="mt-4">
          <h4 className="text-3xl font-black text-foreground">{overview?.transactionCount?.toLocaleString() || "0"}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Minus className="h-[14px] w-[14px]" />
            Completed transactions
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-4 bg-card rounded-xl border-l-4 border-l-amber-500 border-t border-r border-b border-border shadow-sm p-6 flex flex-col justify-between">
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Avg Per Transaction</span>
        <div className="mt-4">
          <h4 className="text-3xl font-black text-foreground">{overview?.avgPerTransactionDisplay || "₱0.00"}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <BarChart3 className="h-[14px] w-[14px]" />
            Basket average
          </div>
        </div>
      </div>
    </>
  )
}
