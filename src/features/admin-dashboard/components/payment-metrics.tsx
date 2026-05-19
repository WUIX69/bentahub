export function PaymentMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Payments */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-primary">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Total Payments
        </span>
        <div className="mt-4">
          <h4 className="text-2xl font-black text-foreground">₱35.00</h4>
          <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>

      {/* Cash */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-teal-500">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Cash
        </span>
        <div className="mt-4">
          <h4 className="text-2xl font-black text-foreground">₱35.00</h4>
          <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>

      {/* GCash */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col justify-between border-l-4 border-l-amber-500">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          GCash
        </span>
        <div className="mt-4">
          <h4 className="text-2xl font-black text-foreground">₱0.00</h4>
          <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: "0%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
