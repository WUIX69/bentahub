import { Download } from "lucide-react"

export function ReservationFilters() {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-6 py-3 bg-muted/20 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Filter Reservations</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div>
          <label className="block text-xs font-bold mb-2 text-muted-foreground ml-1">Status</label>
          <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 text-muted-foreground ml-1">Branch</label>
          <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none">
            <option>All Branches</option>
            <option>Quezon City Main</option>
            <option>Makati Business Hub</option>
            <option>Cebu IT Park</option>
            <option>Davao City Branch</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 text-muted-foreground ml-1">Date Range</label>
          <input 
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary" 
            type="date"
          />
        </div>
        <div>
          <button className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-[42px] px-6 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95">
            <Download className="h-[18px] w-[18px]" />
            Export Data
          </button>
        </div>
      </div>
    </section>
  )
}
