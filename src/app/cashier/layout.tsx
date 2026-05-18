export default function CashierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="cashier-layout">
      {/* TODO: Add Branch-locked navigation and role guard */}
      <header className="p-4 border-b">Cashier POS Header</header>
      <main className="p-4">{children}</main>
    </div>
  )
}
