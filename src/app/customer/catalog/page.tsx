"use client"

import {
  CatalogToolbar,
  CategorySidebar,
  ProductCard,
  Pagination
} from "@/features/customer-dashboard"
import { ShoppingCart } from "lucide-react"
import type { ProductCardProps } from "@/features/customer-dashboard/components/product-card"
import Link from "next/link"

export default function CatalogPage() {
  // Demo products
  const products: ProductCardProps[] = [
    {
      id: "1",
      name: "Kopiko Blanca TWIN",
      category: "Coffee",
      price: "₱15.00",
      image: "/images/dashboard/kopiko-blanca-twin-v2.png",
      stockStatus: "in-stock",
      weight: "52g",
    },
    {
      id: "2",
      name: "Ajinamoto Seasoning",
      category: "Condiments",
      price: "₱5.00",
      image: "/images/dashboard/ajinomoto-seasoning.png",
      stockStatus: "in-stock",
      weight: "10g",
    },
    {
      id: "3",
      name: "Graham Crushed",
      category: "Baking Ingredients",
      price: "₱50.00",
      image: "/images/dashboard/graham-crushed-v2.png",
      stockStatus: "low-stock",
      weight: "200g",
    },
    {
      id: "4",
      name: "Ligo Sardines Red",
      category: "Canned Goods",
      price: "₱28.00",
      image: "/images/dashboard/ligo-sardines-red.png",
      stockStatus: "out-of-stock",
      weight: "155g",
    },
    {
      id: "5",
      name: "Tomato Sauce",
      category: "Sauces",
      price: "₱22.00",
      image: "/images/dashboard/tomato-sauce.png",
      stockStatus: "in-stock",
      weight: "250g",
    },
    {
      id: "6",
      name: "Maxglow Dishwashing",
      category: "Household Supplies",
      price: "₱20.00",
      image: "/images/dashboard/maxglow-dishwashing.png",
      stockStatus: "in-stock",
      weight: "500ml",
    },
    {
      id: "7",
      name: "Datu Toyo",
      category: "Condiments",
      price: "₱12.00",
      image: "/images/dashboard/datu-toyo.png",
      stockStatus: "in-stock",
      weight: "340ml",
    },
    {
      id: "8",
      name: "All-Purpose Flour",
      category: "Baking Ingredients",
      price: "₱35.00",
      image: "/images/dashboard/all-purpose-flour-v2.png",
      stockStatus: "in-stock",
      weight: "1kg",
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
      <Link
        href="/customer/cart"
        className="fixed bottom-20 right-6 md:bottom-6 md:right-6 size-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-40"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 size-5 bg-destructive rounded-full flex items-center justify-center text-xs font-bold text-destructive-foreground">
          3
        </span>
        <span className="sr-only">View Cart</span>
      </Link>
    </div>
  )
}
