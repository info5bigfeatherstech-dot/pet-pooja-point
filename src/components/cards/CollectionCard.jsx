// src/components/cards/CollectionCard.jsx - Curated theme collection card with bright vibrant imagery and subtle bottom shadow
import React from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getCollectionSlug } from "@/data/collections"

export function CollectionCard({ collection }) {
  if (!collection) return null

  const { title, subtitle, image, placesCount } = collection

  return (
    <Link
      to={`/collections/${getCollectionSlug(collection)}`}
      aria-label={`Explore ${title}, ${placesCount} places`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card className="app-card group relative h-72 w-full overflow-hidden select-none border-border shadow-sm hover:shadow-md">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end p-5 text-white">
          <h3 className="font-poppins text-lg font-medium text-white drop-shadow-md transition-colors group-hover:text-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 line-clamp-1 text-xs font-normal text-white/95 drop-shadow-sm">
              {subtitle}
            </p>
          )}
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary">
            <span>{placesCount} Places</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default CollectionCard
