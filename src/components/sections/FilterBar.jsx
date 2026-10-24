// src/components/sections/FilterBar.jsx - Interactive filter chips, cuisine dropdown, sort selector & clear action
import React from "react"
import { Star, Leaf, Clock, X, SlidersHorizontal, Utensils } from "lucide-react"
import Chip from "../common/Chip"
import SortSelect from "../common/SortSelect"
import { Button } from "@/components/ui/button"
import useFilterStore from "@/store/filterStore"
import useCuisines from "@/hooks/useCuisines"

export function FilterBar() {
  const rating4Plus = useFilterStore((state) => state.rating4Plus)
  const setRating4Plus = useFilterStore((state) => state.setRating4Plus)

  const pureVeg = useFilterStore((state) => state.pureVeg)
  const setPureVeg = useFilterStore((state) => state.setPureVeg)

  const openNow = useFilterStore((state) => state.openNow)
  const setOpenNow = useFilterStore((state) => state.setOpenNow)

  const cuisine = useFilterStore((state) => state.cuisine)
  const setCuisine = useFilterStore((state) => state.setCuisine)

  const sortBy = useFilterStore((state) => state.sortBy)
  const setSortBy = useFilterStore((state) => state.setSortBy)

  const resetFilters = useFilterStore((state) => state.resetFilters)

  const { data: cuisinesList } = useCuisines()

  const isAnyFilterActive =
    rating4Plus || pureVeg || openNow || (cuisine && cuisine !== "all") || sortBy !== "rating"

  const cuisineOptions = [
    { value: "all", label: "All Cuisines" },
    ...(cuisinesList || []).map((c) => ({
      value: c.name,
      label: `${c.name} (${c.count})`,
    })),
  ]

  return (
    <div className="py-4 my-2 border-y border-border/60">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mr-1 uppercase tracking-wider shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {/* Rating 4.0+ Chip */}
        <Chip
          label="Rating 4.0+"
          icon={Star}
          active={rating4Plus}
          onClick={() => setRating4Plus()}
        />

        {/* Pure Veg Chip */}
        <Chip
          label="Pure Veg"
          icon={Leaf}
          active={pureVeg}
          onClick={() => setPureVeg()}
        />

        {/* Open Now Chip */}
        <Chip
          label="Open Now"
          icon={Clock}
          active={openNow}
          onClick={() => setOpenNow()}
        />

        {/* Cuisine Selector (via shadcn Select inside SortSelect wrapper) */}
        <div className="shrink-0">
          <SortSelect
            value={cuisine || "all"}
            onValueChange={(val) => setCuisine(val === "all" ? "" : val)}
            placeholder="Cuisine"
            options={cuisineOptions}
            icon={Utensils}
            className={cuisine ? "border-primary text-primary" : ""}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="shrink-0">
          <SortSelect
            value={sortBy}
            onValueChange={setSortBy}
            placeholder="Sort by"
          />
        </div>

        {/* Clear All ghost Button */}
        {isAnyFilterActive && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="rounded-full text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 gap-1.5 h-10 px-3 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default FilterBar
