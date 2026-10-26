// src/components/sections/HeroSection.jsx - Clean promotional dining hero banner with Poppins header and Montreal subheader
import React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Container from "../layout/Container"

export function HeroSection() {
  const scrollToExplore = () => {
    const el = document.getElementById("restaurants-grid")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-white pt-6 pb-4 md:pt-8 md:pb-6">
      <Container>
        {/* Full-width promotional banner with dark gradient and dining photography */}
        <div className="relative overflow-hidden rounded-3xl min-h-[300px] md:min-h-[360px] flex items-center bg-surface shadow-xl border border-border/40">
          {/* Background Food & Dining Atmosphere Image */}
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
            alt="Pet Pooja Point dining experience spread"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Dark Vignette / Gradient Overlay to give left text high contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/25 md:to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl text-white space-y-5">
            {/* Main Offer Headline (Poppins) & Sub-header (Montreal) */}
            <div className="space-y-1.5">
              <p className="text-lg sm:text-xl font-medium font-subheader text-slate-200 tracking-wide capitalize">
                Indulge & unlock up to
              </p>
              <h1 className="text-2xl sm:text-2xl md:text-5xl font-medium font-poppins tracking-tight text-white leading-none">
                45% <span className="text-primary">OFF</span>
              </h1>
              <p className="text-sm sm:text-base font-subheader text-slate-300 font-normal pt-1.5 max-w-lg leading-relaxed capitalize">
                on handcrafted chef menus, rooftop dinners, and premier dine-in experiences with Pet Pooja Point.
              </p>
            </div>

            {/* Action CTA Button */}
            <div className="pt-1">
              <Button
                onClick={scrollToExplore}
                className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold font-subheader px-7 h-12 text-sm sm:text-base transition-all duration-200 shadow-xl shadow-primary/30 gap-2 cursor-pointer capitalize"
              >
                <span>Discover participating tables</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
