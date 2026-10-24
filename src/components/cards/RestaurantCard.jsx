// src/components/cards/RestaurantCard.jsx - Card displaying restaurant details, rating, offers, & pricing with Poppins header and Montreal subheader
import React from "react"
import { Star, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPriceForTwo, formatDistance, formatRatingCount } from "@/utils/formatters"
import { cn } from "@/lib/utils"

export function RestaurantCard({ restaurant }) {
  if (!restaurant) return null

  const {
    name,
    image,
    rating,
    ratingCount,
    cuisines = [],
    locality,
    priceForTwo,
    distanceKm,
    offer,
    isOpen = true,
    deliveryTime,
  } = restaurant

  return (
    <Card className="app-card group cursor-pointer flex flex-col h-full select-none bg-white border-border hover:border-primary hover:shadow-lg">
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />

        {/* Offer Tag */}
        {offer && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="tag-offer text-xs px-2.5 py-0.5 shadow-md border-none font-subheader">
              {offer}
            </Badge>
          </div>
        )}

        {/* Closed Overlay */}
        {!isOpen && (
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-none flex flex-col items-center justify-center text-center p-3 z-20">
            <span className="text-destructive font-semibold font-subheader text-sm tracking-wide uppercase px-3 py-1 rounded-full border border-destructive/40 bg-surface">
              Currently Closed
            </span>
            {deliveryTime && (
              <span className="text-xs font-subheader text-[#9DB5B8] mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {deliveryTime}
              </span>
            )}
          </div>
        )}

        {/* Delivery Time Pill (when open) */}
        {isOpen && deliveryTime && (
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="bg-surface/90 text-white text-[11px] font-medium font-subheader px-2 py-0.5 rounded-md shadow-sm border border-white/10">
              {deliveryTime}
            </span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <CardContent className="p-4 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        <div>
          {/* Header (Poppins) & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium font-poppins text-base text-foreground truncate group-hover:text-primary transition-colors" title={name}>
              {name}
            </h3>
            <Badge className="badge-rating shrink-0 flex items-center gap-1 text-xs px-2 py-0.5 border-none shadow-xs font-subheader">
              <span>{rating.toFixed(1)}</span>
              <Star className="w-3 h-3 fill-white text-white" />
            </Badge>
          </div>

          {/* Sub-header (Montreal): Cuisines */}
          <p className="text-xs font-subheader text-muted-foreground truncate mt-1" title={cuisines.join(", ")}>
            {cuisines.join(", ")}
          </p>
        </div>

        {/* Locality & Distance */}
        <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-subheader text-muted-foreground">
          <span className="truncate max-w-[65%]" title={locality}>
            {locality}
          </span>
          {distanceKm !== undefined && (
            <span className="font-medium shrink-0 text-foreground/80">
              {formatDistance(distanceKm)}
            </span>
          )}
        </div>

        {/* Price & Rating Count */}
        <div className="flex items-center justify-between text-xs font-subheader text-muted-foreground">
          <span className="font-medium text-foreground">
            {formatPriceForTwo(priceForTwo)}
          </span>
          {ratingCount && (
            <span className="text-[11px] text-muted-foreground">
              {formatRatingCount(ratingCount)} ratings
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantCard
