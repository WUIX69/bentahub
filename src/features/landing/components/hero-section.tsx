"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/landing/hero.png"
          alt="Filipino Sari-Sari Store"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          {/* Badge Pill */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 border border-primary/30 text-primary-foreground mb-6">
            REVOLUTIONIZING LOCAL RETAIL
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Your Neighborhood Sari-Sari Store, <span className="text-accent">Now Digital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            BentaHub brings your local stores online. Browse real-time inventory, reserve items, and pick them up when ready. Fast, convenient, and strictly local.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="group">
              <Link href="/customer">
                Browse Catalog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white/30 hover:bg-white/10 hover:text-white">
              <Link href="#branches">
                Our Branches
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
