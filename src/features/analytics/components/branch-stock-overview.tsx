import Link from "next/link"
import { ArrowRight, AlertTriangle, CheckCircle, Flame } from "lucide-react"

export function BranchStockOverview() {
  const branches = [
    {
      name: "Lourdes Main Branch",
      total: 450,
      capacity: 500,
      status: "Healthy",
      colorClass: "bg-emerald-500",
      percentage: 90,
    },
    {
      name: "Lourdes Second Branch",
      total: 320,
      capacity: 500,
      status: "Warning",
      colorClass: "bg-amber-500",
      percentage: 64,
    },
    {
      name: "Lourdes Third Branch",
      total: 280,
      capacity: 500,
      status: "Healthy",
      colorClass: "bg-emerald-500",
      percentage: 56,
    },
  ]

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between h-[400px]">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">Branch Stock Overview</h2>
        <p className="text-sm text-muted-foreground">Inventory stocks per branch</p>
      </div>

      <div className="flex flex-col gap-6 my-auto pt-4">
        {branches.map((branch) => {
          const StatusIcon = (() => {
            switch (branch.status) {
              case "Warning":
                return AlertTriangle
              case "Critical":
                return Flame
              default:
                return CheckCircle
            }
          })()

          return (
            <div key={branch.name} className="flex flex-col gap-2 group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${branch.colorClass}`} />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {branch.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground font-medium">
                    {branch.total} / {branch.capacity} items
                  </span>
                  <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold ${branch.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    branch.status === 'Warning' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${branch.colorClass} rounded-full transition-all duration-500 group-hover:opacity-90`}
                  style={{ width: `${branch.percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border pt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">Branch Status</span>
      </div>
    </div>
  )
}
