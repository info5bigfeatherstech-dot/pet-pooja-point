// src/components/cards/EntryCard.jsx - Major discovery pathway entry card (Delivery, Dining, Nightlife)
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useFilterStore from "@/store/filterStore"
import { cn } from "@/lib/utils"

export function EntryCard({ item }) {
  const activeEntry = useFilterStore((state) => state.activeEntry)
  const setActiveEntry = useFilterStore((state) => state.setActiveEntry)

  if (!item) return null

  const isActive = activeEntry === item.id

  const handleClick = () => {
    setActiveEntry(item.id)
    document.getElementById("restaurants-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <Card
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          handleClick()
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      className={cn(
        "app-card group cursor-pointer flex flex-col overflow-hidden transition-all duration-200 border-2 select-none bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isActive
          ? "border-primary bg-white ring-2 ring-primary/20 shadow-md"
          : "border-border hover:border-primary hover:shadow-md"
      )}
    >
      {/* Image container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {item.badge && (
          <div className="absolute top-3 right-3 z-10">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs px-2.5 py-0.5 border-none shadow-xs font-subheader",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-white/90 text-slate-800 backdrop-blur-xs font-medium"
              )}
            >
              {item.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Header (Poppins) */}
          <h3
            className={cn(
              "text-lg font-medium font-poppins transition-colors",
              isActive ? "text-primary" : "text-foreground group-hover:text-primary"
            )}
          >
            {item.title}
          </h3>
          {/* Sub-header (Montreal) */}
          <p className="text-xs font-subheader text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span
            className={cn(
              "text-xs font-semibold font-subheader tracking-wide uppercase",
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )}
          >
            {isActive ? "Active View" : "Explore Now →"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default EntryCard
