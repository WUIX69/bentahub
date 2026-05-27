"use client"

import Image from "next/image"
import { 
  Minus, 
  Plus, 
  Trash2, 
  MapPin, 
  Info, 
  HelpCircle, 
  Bookmark, 
  ShieldCheck 
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">Carts</h2>
        <p className="text-muted-foreground mt-1">Review your selected items before submitting your reservation request.</p>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Item List & Schedule */}
        <div className="flex-1 space-y-6 w-full">
          {/* Items Section */}
          <section className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
            <div className="p-4 bg-muted border-b border-border flex justify-between items-center">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Product Details</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quantity</span>
            </div>
            <div className="divide-y divide-border">
              {/* Item: Kopiko Blanca */}
              <div className="p-6 flex items-center gap-6 group">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <Image 
                    alt="Kopiko Blanca" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKBE2yv0e1lT3xnjBD7HC5FYIm_4Y5diSqL1As7dyVNf2jn8kMGB7yjmlAII2valo777DjR7Vag5Dpnmyibtz_Eka0NULwQsi90oGsDdgPvgxD2JDJEuynMbq96su42ynN7fMTZdj1MXmSNJE0MqgGGvYDqGDh-EMpLQMg5UStFT1LzHl9VY6vO4RGizPMvIUgyhmCqY6HMOA-IMplaHpIZo6q-bP6hEz2t34jhS3CeThpQl0_HX1W_ReA4bmiB7qsUuS548Kd1Yd0"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">Kopiko Blanca 3-in-1</h3>
                  <p className="text-sm text-muted-foreground">Box of 10</p>
                  <p className="font-mono text-primary font-bold mt-2">₱120.00 <span className="text-muted-foreground font-normal">/ unit</span></p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden h-10">
                    <button className="px-3 hover:bg-muted transition-colors h-full flex items-center"><Minus className="h-4 w-4" /></button>
                    <input className="w-12 text-center border-x border-border bg-transparent font-mono text-foreground h-full" type="text" value="2" readOnly />
                    <button className="px-3 hover:bg-muted transition-colors h-full flex items-center"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button className="text-destructive text-xs hover:underline flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>

              {/* Item: Datu Puti Toyo */}
              <div className="p-6 flex items-center gap-6 group">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <Image 
                    alt="Datu Puti Soy Sauce" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJWGrtEQ9Me2IfanpmlfqcBvtWN96NkDIhrXBqkmZUKg_3EhyN0hr4w_XDjM9xa2ftZghhf4x6zmf15Mrx9lDAijGAgCqh6g4ETWynOQj-1Mi61c3t5nwJHpNcoR3uA3XTEsKbD3Ek0oDkZUEnVM9OCEAxNAQgzpc8F21v4Q5JouKBbcNsAAL8ffjrhyyZbAcgII5bXWlokNbg9ogKISl-wQHS-9DIOJudlHhFdx7VeBE2ZLfLavhetFw-4WdLgUSwpbA8QrWGQoRU"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">Datu Puti Soy Sauce</h3>
                  <p className="text-sm text-muted-foreground">1 Liter Bottle</p>
                  <p className="font-mono text-primary font-bold mt-2">₱45.50 <span className="text-muted-foreground font-normal">/ unit</span></p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden h-10">
                    <button className="px-3 hover:bg-muted transition-colors h-full flex items-center"><Minus className="h-4 w-4" /></button>
                    <input className="w-12 text-center border-x border-border bg-transparent font-mono text-foreground h-full" type="text" value="1" readOnly />
                    <button className="px-3 hover:bg-muted transition-colors h-full flex items-center"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button className="text-destructive text-xs hover:underline flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>

              {/* Item: Ligo Sardines */}
              <div className="p-6 flex items-center gap-6 group">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <Image 
                    alt="Ligo Sardines" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-TW8tN2TCSb2R0YsyxNFhu8uurMKfucubkAMAIChFR2siK-A7lhcrPcsmA3q4zchZWmPgbza-DrXErZ7YtkU2XJDyxxkiC1TIc_qrsZSmo6Pn4vonMrDA3JJBELlA1h-6TRd_nnKqZt-NBgusw-XNus7ZJjG7RvfovfuCB_GY1sYyt8jYgWOBLcNKVlGQQQB7XSJTJA-x9Yr0AYezEeFmEGUpSPJUll9sufxHeV2uUqMZpJ54sY2Xseus6fRnrBnAfXOzDmEq8YYn"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">Ligo Sardines in Tomato Sauce</h3>
                  <p className="text-sm text-muted-foreground">155g Can (Pack of 3)</p>
                  <p className="font-mono text-primary font-bold mt-2">₱72.00 <span className="text-muted-foreground font-normal">/ unit</span></p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden h-10">
                    <button className="px-3 hover:bg-muted transition-colors h-full flex items-center"><Minus className="h-4 w-4" /></button>
                    <input className="w-12 text-center border-x border-border bg-transparent font-mono text-foreground h-full" type="text" value="3" readOnly />
                    <button className="px-3 hover:bg-muted transition-colors h-full flex items-center"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button className="text-destructive text-xs hover:underline flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Pickup Schedule Section */}
          <section className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">Pickup Location</h3>
                <p className="text-base text-foreground mt-1">BentaHub Santa Maria Bulacan Branch</p>
                <p className="text-sm text-muted-foreground">Poblacion, Santa Maria, Bulacan, 3022</p>
                <div className="mt-4 p-4 bg-muted rounded-lg border border-primary/10 flex gap-3">
                  <Info className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground italic">Note: You will be asked to select a specific date and time window for your pickup on the next confirmation step.</p>
                </div>
              </div>
              <button className="text-primary text-sm font-bold hover:underline">Change Branch</button>
            </div>
          </section>
        </div>

        {/* Right: Order Summary (Sticky) */}
        <aside className="w-full lg:w-96 sticky top-24">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-mono text-foreground">₱501.50</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Service Fee</span>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </div>
                <span className="font-mono text-foreground">₱5.02</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reservation Bond</span>
                <span className="font-mono text-foreground">₱50.00</span>
              </div>
            </div>
            <div className="pt-4 border-t border-border mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total Due</span>
                <span className="text-2xl font-bold text-primary">₱556.52</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-right">Includes VAT where applicable</p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-primary text-white py-4 rounded-lg font-bold active:scale-[0.99] transition-all shadow-sm hover:brightness-110">
                Submit Request
              </Button>
              <button className="w-full bg-transparent border border-border text-muted-foreground py-4 rounded-lg font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Bookmark className="h-4 w-4" />
                Save for later
              </button>
            </div>
            <div className="mt-8 p-4 rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Secure Reservation</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reservation bonds are fully refundable if the items are unavailable or if the reservation is canceled within the grace period.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
