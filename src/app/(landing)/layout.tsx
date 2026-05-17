import { Metadata } from "next"
import { Navbar } from "@/features/landing"

export const metadata: Metadata = {
  title: "BentaHub | Your Neighborhood Sari-Sari Store, Now Digital",
  description: "BentaHub brings your local stores online. Browse real-time inventory, reserve items, and pick them up when ready.",
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
