"use client"

import { ProductCatalog } from "@/features/cashier-dashboard/components/product-catalog"
import { CartSidebar } from "@/features/cashier-dashboard/components/cart-sidebar"
import { useCart } from "@/features/cashier-dashboard/hooks/use-cart"

export default function CashierPage() {
  const cart = useCart()

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Product Catalog Grid */}
      <ProductCatalog onAddProduct={cart.addItem} />

      {/* Cart Checkout Sidebar */}
      <CartSidebar cart={cart} />
    </div>
  )
}
