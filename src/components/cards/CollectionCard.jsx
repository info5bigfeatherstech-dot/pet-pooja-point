// src/components/cards/CollectionCard.jsx - Curated theme collection card with bright vibrant imagery and subtle bottom shadow
import React from "react"
import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

export function CollectionCard({ collection }) {
  if (!collection) return null

  const { title, subtitle, image, placesCount } = collection

  return (
    <Card className="app-card group relative h-72 w-full overflow-hidden cursor-pointer select-none border-border shadow-sm hover:shadow-md">
      {/* Background Image - Clean, bright, and vibrant */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Subtle Bottom-Only Shadow Gradient (keeps the top & middle bright and clear) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end text-white">
        {/* Header (Poppins Medium) */}
        <h3 className="text-lg font-medium font-poppins text-white drop-shadow-md group-hover:text-primary transition-colors">
          {title}
        </h3>
        {/* Sub-header (Montreal) */}
        {subtitle && (
          <p className="text-xs font-subheader text-white/95 line-clamp-1 mt-1 font-normal drop-shadow-sm">
            {subtitle}
          </p>
        )}
        <div className="flex items-center gap-1 text-xs font-semibold font-subheader text-primary mt-2">
          <span>{placesCount} Places</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Card>
  )
}

export default CollectionCard
