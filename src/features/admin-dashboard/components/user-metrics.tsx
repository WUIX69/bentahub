import { UserPlus, ShieldCheck, Shield } from "lucide-react"

export function UserMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* New this week */}
      <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-l-primary/40 group hover:border-primary transition-all duration-300">
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <UserPlus className="h-7 w-7" />
        </div>
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">
            New this week
          </p>
          <p className="text-3xl font-black text-foreground">12 Users</p>
        </div>
      </div>

      {/* Active Rate */}
      <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-l-green-500/40 group hover:border-emerald-500 transition-all duration-300">
        <div className="w-14 h-14 bg-green-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <div>
          <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-0.5">
            Active Rate
          </p>
          <p className="text-3xl font-black text-foreground">94.2%</p>
        </div>
      </div>

      {/* Role USERS */}
      <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex items-center gap-4 border-l-4 border-l-amber-500/40 group hover:border-amber-500 transition-all duration-300">
        <div className="w-14 h-14 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
          <Shield className="h-7 w-7" />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-0.5">
            Role USERS
          </p>
          <p className="text-3xl font-black text-foreground">4 Types</p>
        </div>
      </div>
    </div>
  )
}
