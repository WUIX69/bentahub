"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Premium Sinandomeng Rice",
    category: "Grains",
    price: 55,
    image: "/images/landing/prod-1.png",
  },
  {
    id: 2,
    name: "Fresh Native Tomatoes",
    category: "Produce",
    price: 40,
    image: "/images/landing/prod-2.png",
  },
  {
    id: 3,
    name: "Ligo Sardines (Green)",
    category: "Canned Goods",
    price: 22,
    image: "/images/landing/prod-3.png",
  },
  {
    id: 4,
    name: "Fresh Farm Eggs (Dozen)",
    category: "Dairy & Eggs",
    price: 95,
    image: "/images/landing/prod-4.png",
  },
  {
    id: 5,
    name: "Golden Fiesta Cooking Oil",
    category: "Pantry",
    price: 35,
    image: "/images/landing/prod-5.png",
  },
  {
    id: 6,
    name: "Lucky Me! Pancit Canton",
    category: "Instant Meals",
    price: 15,
    image: "/images/landing/prod-6.png",
  },
]

export function ProductGrid() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Essential Goods
            </h2>
            <p className="mt-2 text-muted-foreground">
              Items available for reservation.
            </p>
          </div>
          <Link
            href="/customer"
            className="text-primary font-medium flex items-center gap-1 hover:underline"
          >
            See all products
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Reserve
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  {product.category}
                </p>
                <h3 className="text-sm font-semibold text-foreground line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-primary">
                  ₱{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
