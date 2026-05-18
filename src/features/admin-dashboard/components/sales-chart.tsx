export function SalesChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6 h-[400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Sales Trend</h2>
          <p className="text-sm text-muted-foreground">Monthly sales performance across all branches</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-accent rounded-lg">Monthly</button>
          <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent rounded-lg transition-colors">Weekly</button>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4 relative">
        {/* Mock Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-muted-foreground/50 pointer-events-none">
          <div className="border-b border-border w-full pb-1">150k</div>
          <div className="border-b border-border w-full pb-1">100k</div>
          <div className="border-b border-border w-full pb-1">50k</div>
          <div className="w-full">0</div>
        </div>

        {/* Bars */}
        {months.map((month, index) => {
          // Mock heights
          const heights = [40, 60, 45, 70, 85, 55, 65, 75, 90, 60, 70, 95]
          const height = heights[index]
          
          return (
            <div key={month} className="relative flex-1 flex flex-col items-center gap-2 group z-10">
              <div 
                className="w-full max-w-[32px] bg-primary/20 hover:bg-primary rounded-t-sm transition-all cursor-pointer relative"
                style={{ height: `${height}%` }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                  ₱{height * 1.5}k
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{month}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
