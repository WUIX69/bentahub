"use client"

import { ProductBreadcrumb } from "@/features/customer-dashboard/components/product-breadcrumb"
import { ProductImageGallery } from "@/features/customer-dashboard/components/product-image-gallery"
import { ProductPricing } from "@/features/customer-dashboard/components/product-pricing"
import { ProductActions } from "@/features/customer-dashboard/components/product-actions"
import { ProductDetailsSection } from "@/features/customer-dashboard/components/product-details-section"
import { ProductSidebarSection } from "@/features/customer-dashboard/components/product-sidebar-section"
import { Heart } from "lucide-react"
import { useState, use } from "react"
import { useCart } from "@/hooks/useCart"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addToCart } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)

  // Demo product data
  const product = {
    id,
    name: "Del Monte Tomato Sauce",
    category: "Pantry Essentials",
    price: "₱45.50",
    originalPrice: "₱48.00",
    bulkPrice: "₱41.25",
    image: "/images/dashboard/tomato-sauce.png",
    stockCount: 85,
    sku: "DMT-250G-V01",
    status: "Available",
    branch: "Main Branch",
    description: "Del Monte Tomato Sauce is the perfect base for your everyday dishes. Made with 100% real tomatoes, it contains no MSG and is naturally rich in Lycopene. Its rich, thick consistency and savory flavor make it ideal for pasta sauces, stews, and traditional Filipino recipes like Menudo and Afritada.",
    features: [
      "No Artificial Preservatives",
      "Rich in Vitamin A & C",
      "Non-GMO Tomatoes",
      "Halal Certified",
    ],
    specs: [
      { label: "Weight / Volume", value: "250g Pouch" },
      { label: "Exp.Date", value: "12 Months" },
      { label: "Brand Origin", value: "Philippines" },
      { label: "Storage", value: "Cool, Dry Place" },
    ],
    relatedProducts: [
      { id: "1", name: "Datu Puti Soy Sauce", price: "₱32.00", image: "/images/dashboard/datu-toyo.png" },
      { id: "2", name: "Golden Fiesta Palm Oil", price: "₱68.50", image: "/images/dashboard/product-2.png" },
      { id: "3", name: "Las Pinas Iodized Salt", price: "₱15.00", image: "/images/dashboard/product-3.png" },
    ]
  }

  return (
    <div className="flex flex-col gap-6">
      <ProductBreadcrumb category={product.category} productName={product.name} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductImageGallery image={product.image} name={product.name} />
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{product.name}</h1>
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle favorite"
              >
                <Heart className={`h-6 w-6 ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
            </div>
          </div>

          <ProductPricing
            retailPrice={product.price}
            originalPrice={product.originalPrice}
            bulkPrice={product.bulkPrice}
          />

          <ProductActions
            stockCount={product.stockCount}
            sku={product.sku}
            status={product.status}
            onAddToCart={async (quantity) => {
              await addToCart(product.id, quantity, product.branch)
            }}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <div className="lg:col-span-2">
          <ProductDetailsSection
            description={product.description}
            features={product.features}
            specs={product.specs}
          />
        </div>
        <div className="lg:col-span-1">
          <ProductSidebarSection relatedProducts={product.relatedProducts} />
        </div>
      </div>
    </div>
  )
}
