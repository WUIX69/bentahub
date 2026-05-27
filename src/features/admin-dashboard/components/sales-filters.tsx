import { Download } from "lucide-react"

export function SalesFilters() {
  return (
    <section className="col-span-1 md:col-span-12 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="px-6 py-3 bg-muted/20 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">Sales Filters</h3>
      </div>
      <div className="p-6 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold mb-2 text-muted-foreground">Date</label>
          <div className="relative">
            <input
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              type="date"
              defaultValue="2024-03-22"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold mb-2 text-muted-foreground">Branch</label>
          <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary">
            <option>All Branches</option>
            <option>Lourdes Main Branch</option>
            <option>Lourdes Second Branch</option>
            <option>Lourdes Third Branch</option>
          </select>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </section>
  )
}
