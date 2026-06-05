import { 
  HeroSection, 
  StatsBar, 
  BranchGrid, 
  ProductGrid, 
  CtaBanner,
  Footer
} from "@/features/landing"

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <BranchGrid />
      <ProductGrid />
      <CtaBanner />
      <Footer />
    </>
  )
}
