export function InventoryStatusTable() {
  const items = [
    { name: "Rice (Premium Grade)", category: "General", qty: 100, reorder: 10, status: "Active", updated: "5/17/2026" },
    { name: "Sugar (White)", category: "General", qty: 50, reorder: 10, status: "Active", updated: "5/17/2026" },
    { name: "Cooking Oil (1L)", category: "General", qty: 30, reorder: 10, status: "Active", updated: "5/17/2026" },
  ]

  return (
    <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
        <h4 className="font-bold text-lg text-foreground">Inventory Status Overview</h4>
        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
          Last updated: Just now
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Reorder Level</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr 
                key={item.name} 
                className="hover:bg-primary/5 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 font-bold text-sm text-foreground">{item.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{item.category}</td>
                <td className="px-6 py-4 font-mono text-sm text-foreground">{item.qty}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{item.reorder}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
