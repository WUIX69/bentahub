"use client"

import { CheckCircle } from "lucide-react"

interface ProductDetailsSectionProps {
  description: string
  features: string[]
  specs: { label: string; value: string }[]
}

export function ProductDetailsSection({ description, features, specs }: ProductDetailsSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Description Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Description</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Technical Specifications</h3>
        <div className="flex flex-col border-t border-border">
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">{spec.label}</span>
              <span className="text-sm font-mono text-foreground">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
