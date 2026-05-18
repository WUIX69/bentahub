"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ProductBreadcrumbProps {
  category: string
  productName: string
}

export function ProductBreadcrumb({ category, productName }: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap">
      <Link href="/customer/catalog" className="hover:text-primary transition-colors">
        Catalog
      </Link>
      <ChevronRight className="h-3 w-3 flex-shrink-0" />
      <span className="flex-shrink-0">{category}</span>
      <ChevronRight className="h-3 w-3 flex-shrink-0" />
      <span className="font-medium text-foreground truncate">{productName}</span>
    </nav>
  )
}
