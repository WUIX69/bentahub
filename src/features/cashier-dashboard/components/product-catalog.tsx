"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { products } from "@/features/cashier-dashboard/data/products"
import { ProductCard } from "./product-card"
import type { Product } from "@/types/cashier"
import { cn } from "@/lib/utils"

interface ProductCatalogProps {
  onAddProduct: (product: Product) => void
}

const CATEGORIES = ["All", "Groceries", "Beverages", "Household", "Pharmacy", "Snacks", "Bakery"]

export function ProductCatalog({ onAddProduct }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut Ctrl+K to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-4 md:p-6">
      {/* Search and Filter Panel */}
      <div className="flex flex-col gap-4 mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 py-1">
        {/* Search Input */}
        <div className="relative group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products (Ctrl + K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none text-sm shadow-sm"
          />
        </div>

        {/* Category Scroll Container */}
        <div className="flex gap-2 overflow-x-auto pb-1 select-none scrollbar-none items-center">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm border",
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-blue-600/20"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-600 hover:text-blue-600"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="text-sm font-semibold">No products found</span>
            <span className="text-xs">Try adjusting your filters or search query</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-8">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onAdd={onAddProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
