import type { InventoryStatusItem } from "@/types/admin"

interface InventoryStatusTableProps {
  data: InventoryStatusItem[]
}

function formatDate(dateStr: string | Date): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-PH", { month: "numeric", day: "numeric", year: "numeric" })
}

export function InventoryStatusTable({ data }: InventoryStatusTableProps) {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
        <h4 className="font-bold text-lg text-foreground">Inventory Status Overview</h4>
        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
          {data.length} products tracked
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Total Quantity</th>
              <th className="px-6 py-4">Reorder Level</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => {
              const statusColor = {
                Active: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
                "Low Stock": "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
                Critical: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
              }[item.status]

              return (
                <tr key={item.productId} className="hover:bg-primary/5 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-bold text-sm text-foreground">{item.productName}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 font-mono text-sm text-foreground">{item.totalQuantity}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.reorderLevel}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{formatDate(item.lastUpdated)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
