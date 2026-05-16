export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="customer-layout">
      {/* TODO: Add Customer catalog navigation */}
      <nav className="p-4 border-b">Customer Catalog Nav</nav>
      <main className="p-4">{children}</main>
    </div>
  )
}
