// src/components/sections/RestaurantGridSection.jsx - Infinite query restaurant discovery grid with states
import React from "react"
import { Loader2 } from "lucide-react"
import Container from "../layout/Container"
import SectionHeader from "../common/SectionHeader"
import FilterBar from "./FilterBar"
import RestaurantCard from "../cards/RestaurantCard"
import CardSkeleton from "../common/CardSkeleton"
import EmptyState from "../common/EmptyState"
import ErrorState from "../common/ErrorState"
import { Button } from "@/components/ui/button"
import useRestaurants from "@/hooks/useRestaurants"
import useLocationStore from "@/store/locationStore"
import useFilterStore from "@/store/filterStore"

export function RestaurantGridSection() {
  const city = useLocationStore((state) => state.city)
  const resetFilters = useFilterStore((state) => state.resetFilters)
  const activeEntry = useFilterStore((state) => state.activeEntry)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRestaurants()

  // Flatten infinite query pages
  const allRestaurants = data?.pages.flatMap((page) => page.items) || []
  const totalCount = data?.pages[0]?.total || 0

  const getEntryLabel = () => {
    if (activeEntry === "dining") return "Dining & Cafes"
    if (activeEntry === "nightlife") return "Nightlife & Lounges"
    return "Delivery & Dining"
  }

  return (
    <section id="restaurants-grid" className="py-10 md:py-14 scroll-mt-20 bg-white">
      <Container>
        {/* Section Heading */}
        <SectionHeader
          title={`Best restaurants in ${city}`}
          subtitle={`Showing ${totalCount} top places for ${getEntryLabel()}`}
        />

        {/* Filter Bar with Chips and Sort Selectors */}
        <FilterBar />

        {/* Content Area */}
        <div className="mt-8">
          {isLoading ? (
            /* 8 skeleton cards while loading */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <CardSkeleton key={idx} variant="restaurant" />
              ))}
            </div>
          ) : isError ? (
            /* Error State with retry */
            <ErrorState
              title="Failed to fetch restaurants"
              message={error?.message || "Could not retrieve restaurant data. Please try again."}
              onRetry={refetch}
            />
          ) : allRestaurants.length === 0 ? (
            /* Empty State */
            <EmptyState
              title="No restaurants match your filters"
              message="We couldn't find any places matching your selected criteria. Try resetting your filters to see more results."
              actionLabel="Clear all filters"
              onAction={resetFilters}
            />
          ) : (
            /* Restaurant Grid */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasNextPage && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="rounded-full px-8 h-12 border-border hover:border-primary text-foreground font-semibold gap-2 min-w-[200px] bg-white hover:bg-slate-50 shadow-xs cursor-pointer"
                  >
                    {isFetchingNextPage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Load more restaurants</span>
                    )}
                  </Button>
                </div>
              )}

              {/* End of list indicator */}
              {!hasNextPage && allRestaurants.length > 0 && (
                <div className="text-center mt-12 py-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    You've explored all {totalCount} matching restaurants in {city}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

export default RestaurantGridSection
