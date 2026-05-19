import { CreditCard, AlertTriangle, Calendar } from "lucide-react"

export function MonitoringMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      {/* Total Stock Value */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <span className="flex items-center text-green-600 font-bold text-[11px] bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full">
            +4.2%
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Total Stock Value
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">₱4,285,900</h3>
        </div>
      </div>

      {/* Low Stock Items */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-destructive transition-all duration-300 border-l-4 border-l-destructive">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <span className="flex items-center text-destructive font-bold text-[11px] bg-destructive/10 px-3 py-1 rounded-full uppercase tracking-widest font-black">
            Critical
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Low Stock Items
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">128</h3>
        </div>
      </div>

      {/* Pending Reservations */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
            <Calendar className="h-6 w-6" />
          </div>
          <span className="flex items-center text-muted-foreground font-bold text-[11px] bg-muted px-3 py-1 rounded-full">
            12 Today
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Pending Reservations
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">45</h3>
        </div>
      </div>
    </div>
  )
}
