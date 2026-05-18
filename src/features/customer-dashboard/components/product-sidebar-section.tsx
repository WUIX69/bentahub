"use client"

import Image from "next/image"
import { Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RelatedProduct {
  id: string
  name: string
  price: string
  image: string
}

interface ProductSidebarSectionProps {
  relatedProducts: RelatedProduct[]
}

export function ProductSidebarSection({ relatedProducts }: ProductSidebarSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Fast Pick-up Card */}
      <div className="bg-primary text-primary-foreground p-6 rounded-xl shadow-md">
        <Truck className="h-10 w-10 mb-4 opacity-90" />
        <h4 className="text-lg font-bold mb-2">Fast Pick-up</h4>
        <p className="text-sm opacity-90 mb-6 leading-relaxed">
          Reserve now and pick up at your selected BentaHub branch within 2 hours. Fast, secure, and hassle-free.
        </p>
        <Button variant="secondary" className="w-full bg-background text-primary hover:bg-background/90">
          Select Store
        </Button>
      </div>

      {/* Related Products Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Related Products</h3>
        <div className="flex flex-col gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {product.name}
                </span>
                <span className="text-sm font-bold text-primary">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-6">
          View All Staples
        </Button>
      </div>
    </div>
  )
}
