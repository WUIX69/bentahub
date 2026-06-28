import { CalendarCheck, Clock, CheckCircle2, XCircle } from "lucide-react"

export function ReservationMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Reservations */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <span className="flex items-center text-primary font-bold text-[11px] bg-primary/10 px-3 py-1 rounded-full">
            +12%
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Total Reservations
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">1,284</h3>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-amber-500 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
            <Clock className="h-6 w-6" />
          </div>
          <span className="flex items-center text-amber-600 dark:text-amber-400 font-bold text-[11px] bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
            Active
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Pending
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">42</h3>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-emerald-500 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-[11px] bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
            92% Success
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Completed
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">1,190</h3>
        </div>
      </div>

      {/* Cancelled */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-destructive transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
            <XCircle className="h-6 w-6" />
          </div>
          <span className="flex items-center text-destructive font-bold text-[11px] bg-destructive/10 px-3 py-1 rounded-full">
            4% Growth
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">
            Cancelled
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">52</h3>
        </div>
      </div>
    </div>
  )
}
