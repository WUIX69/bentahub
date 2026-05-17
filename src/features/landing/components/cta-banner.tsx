"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left text-primary-foreground">
            <h2 className="text-3xl font-bold mb-2">
              Ready to start shopping?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl">
              Create an account today and experience the convenience of digital neighborhood shopping.
            </p>
          </div>
          <Button 
            size="lg" 
            asChild 
            className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 h-14"
          >
            <Link href="/register">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
