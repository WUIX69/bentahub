import { TrendingUp, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

export function PickupMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Orders */}
      <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Total Orders</p>
          <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">124</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-primary">
          <TrendingUp className="h-3.5 w-3.5" /> 12% vs last week
        </div>
      </div>

      {/* Completed */}
      <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Completed</p>
          <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">98</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" /> 82% success rate
        </div>
      </div>

      {/* Pending */}
      <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Pending</p>
          <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">18</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Clock className="h-3.5 w-3.5" /> Action required
        </div>
      </div>

      {/* Delayed */}
      <div className="bg-card p-8 rounded-xl border border-border shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-destructive"></div>
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">Delayed</p>
          <h3 className="text-[32px] font-bold text-foreground leading-none mt-2">8</h3>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-destructive">
          <AlertTriangle className="h-3.5 w-3.5" /> Immediate attention
        </div>
      </div>
    </div>
  )
}
