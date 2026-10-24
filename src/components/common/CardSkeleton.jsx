// src/components/common/CardSkeleton.jsx - Skeletons matching RestaurantCard & CollectionCard layouts
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function RestaurantCardSkeleton() {
  return (
    <Card className="app-card border-border bg-card">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content Skeleton */}
      <CardContent className="p-4 space-y-3">
        {/* Name & Rating */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-5 w-12 rounded-md" />
        </div>

        {/* Cuisines */}
        <Skeleton className="h-4 w-4/5" />

        {/* Locality & Distance */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3.5 w-14" />
        </div>

        {/* Price & Delivery */}
        <div className="pt-2 border-t border-border/50 flex items-center justify-between">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function CollectionCardSkeleton() {
  return (
    <Card className="app-card border-border bg-card">
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3.5 w-1/3" />
        </div>
      </div>
    </Card>
  )
}

export function CardSkeleton({ variant = "restaurant" }) {
  if (variant === "collection") {
    return <CollectionCardSkeleton />
  }
  return <RestaurantCardSkeleton />
}

export default CardSkeleton
