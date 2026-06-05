import { TrendingUp } from "lucide-react"

export function HistoryMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total Transactions */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-primary">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Total Transactions
        </span>
        <div className="mt-4">
          <h4 className="text-2xl font-black text-foreground">1,284</h4>
          <div className="flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 mt-1">
            <TrendingUp className="h-3.5 w-3.5" />
            +12% this week
          </div>
        </div>
      </div>

      {/* Total Sales */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-teal-500">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Total Sales (PHP)
        </span>
        <div className="mt-4">
          <h4 className="text-2xl font-black text-foreground">₱45,920.00</h4>
        </div>
      </div>
    </div>
  )
}
