"use client"

import { 
  CatalogToolbar, 
  CategorySidebar, 
  ProductCard, 
  Pagination 
} from "@/features/customer-dashboard"
import { ShoppingCart } from "lucide-react"
import type { ProductCardProps } from "@/features/customer-dashboard/components/product-card"

export default function CatalogPage() {
  // Demo products
  const products: ProductCardProps[] = [
    {
      id: "1",
      name: "Premium Jasmine Rice",
      category: "Grains & Rice",
      price: "₱1,250.00",
      image: "/images/dashboard/product-1.png",
      stockStatus: "in-stock",
      weight: "25kg",
    },
    {
      id: "2",
      name: "Fresh Native Eggs",
      category: "Dairy & Eggs",
      price: "₱220.00",
      image: "/images/dashboard/product-2.png",
      stockStatus: "in-stock",
      weight: "30 pcs (1 tray)",
    },
    {
      id: "3",
      name: "Canned Sardines Mega",
      category: "Canned Goods",
      price: "₱28.00",
      image: "/images/dashboard/product-3.png",
      stockStatus: "low-stock",
      weight: "155g",
    },
    {
      id: "4",
      name: "Refined Sugar",
      category: "Grains & Rice",
      price: "₱45.00",
      image: "/images/dashboard/product-1.png",
      stockStatus: "out-of-stock",
      weight: "1kg",
    },
    {
      id: "5",
      name: "Cooking Oil Palm",
      category: "Produce",
      price: "₱75.00",
      image: "/images/dashboard/product-2.png",
      stockStatus: "in-stock",
      weight: "1 Liter",
    },
    {
      id: "6",
      name: "Instant Noodles Chicken",
      category: "Snacks",
      price: "₱15.00",
      image: "/images/dashboard/product-3.png",
      stockStatus: "in-stock",
      weight: "55g",
    },
    {
      id: "7",
      name: "Evaporated Milk",
      category: "Canned Goods",
      price: "₱42.00",
      image: "/images/dashboard/product-1.png",
      stockStatus: "in-stock",
      weight: "370ml",
    },
    {
      id: "8",
      name: "Soy Sauce Silver Swan",
      category: "Produce",
      price: "₱35.00",
      image: "/images/dashboard/product-2.png",
      stockStatus: "in-stock",
      weight: "1 Liter",
    },
  ]

  return (
    <div className="flex flex-col h-full -m-4 md:-m-6">
      {/* Toolbar */}
      <CatalogToolbar />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile */}
        <CategorySidebar />

        {/* Product Grid Area */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>

      {/* FAB Cart Button */}
      <button className="fixed bottom-20 right-6 md:bottom-6 md:right-6 size-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-40">
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 size-5 bg-destructive rounded-full flex items-center justify-center text-xs font-bold text-destructive-foreground">
          3
        </span>
        <span className="sr-only">View Cart</span>
      </button>
    </div>
  )
}
