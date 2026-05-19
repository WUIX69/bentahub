import { TrendingUp, Minus, BarChart3 } from "lucide-react"

export function SalesMetrics() {
  return (
    <>
      <div className="col-span-1 md:col-span-4 bg-card rounded-xl border-l-4 border-l-primary border-t border-r border-b border-border shadow-sm p-6 flex flex-col justify-between">
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Sales</span>
        <div className="mt-4">
          <h4 className="text-3xl font-black text-foreground">₱0.00</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <TrendingUp className="h-[14px] w-[14px]" />
            0% from yesterday
          </div>
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-4 bg-card rounded-xl border-l-4 border-l-teal-600 border-t border-r border-b border-border shadow-sm p-6 flex flex-col justify-between">
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Transactions</span>
        <div className="mt-4">
          <h4 className="text-3xl font-black text-foreground">0</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Minus className="h-[14px] w-[14px]" />
            No current activity
          </div>
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-4 bg-card rounded-xl border-l-4 border-l-amber-500 border-t border-r border-b border-border shadow-sm p-6 flex flex-col justify-between">
        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Avg Per Transaction</span>
        <div className="mt-4">
          <h4 className="text-3xl font-black text-foreground">₱0.00</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <BarChart3 className="h-[14px] w-[14px]" />
            Basket average
          </div>
        </div>
      </div>
    </>
  )
}
