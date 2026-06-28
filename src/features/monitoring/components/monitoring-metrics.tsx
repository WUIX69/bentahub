import { CreditCard, AlertTriangle, Calendar } from "lucide-react"
import type { MonitoringMetricsData } from "@/types/admin"

interface MonitoringMetricsProps {
  data: MonitoringMetricsData
}

export function MonitoringMetrics({ data }: MonitoringMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <span className="flex items-center text-green-600 font-bold text-[11px] bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full">
            {data.totalStockValue.trend}
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Total Stock Value
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">{data.totalStockValue.value}</h3>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-destructive transition-all duration-300 border-l-4 border-l-destructive">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <span className="flex items-center text-destructive font-bold text-[11px] bg-destructive/10 px-3 py-1 rounded-full uppercase tracking-widest font-black">
            {data.lowStockItems.severity}
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Low Stock Items
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">{data.lowStockItems.value}</h3>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
            <Calendar className="h-6 w-6" />
          </div>
          <span className="flex items-center text-muted-foreground font-bold text-[11px] bg-muted px-3 py-1 rounded-full">
            {data.pendingReservations.todayCount} Today
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Pending Reservations
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">{data.pendingReservations.value}</h3>
        </div>
      </div>
    </div>
  )
}
