/**
 * QR & Point of Sale (POS) Feature Slice
 *
 * Responsible for:
 * - Barcode/QR code generation and scanning
 * - Cart compilation and transaction computation
 * - Checkout flow orchestration
 *
 * Consumed by: src/app/cashier/
 */

export { CartItem } from "./components/cart-item"
export { CartSidebar } from "./components/cart-sidebar"
export { PosProductCard } from "./components/pos-product-card"
export { ProductCatalog } from "./components/product-catalog"
export { useCart } from "./hooks/use-cart"

