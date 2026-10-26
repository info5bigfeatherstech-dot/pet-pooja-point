import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ArrowLeft, Loader2, MapPin, Utensils } from "lucide-react"
import Container from "@/components/layout/Container"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import RestaurantCard from "@/components/cards/RestaurantCard"
import CardSkeleton from "@/components/common/CardSkeleton"
import EmptyState from "@/components/common/EmptyState"
import ErrorState from "@/components/common/ErrorState"
import { Button } from "@/components/ui/button"
import { getRestaurants } from "@/api/restaurantApi"
import { cuisines } from "@/data/cuisines"
import { localities } from "@/data/localities"
import useLocationStore from "@/store/locationStore"

function findBySlug(items, slug) {
  return items.find(
    (item) => item.name.toLowerCase().replace(/\s+/g, "-") === slug
  )
}

export function PlaceBrowsePage() {
  const { localitySlug, cuisineSlug } = useParams()
  const navigate = useNavigate()
  const city = useLocationStore((state) => state.city)
  const isCuisinePage = Boolean(cuisineSlug)
  const selectedItem = isCuisinePage
    ? findBySlug(cuisines, cuisineSlug)
    : findBySlug(localities, localitySlug)

  const restaurantsQuery = useInfiniteQuery({
    queryKey: [
      "place-restaurants",
      city,
      isCuisinePage ? "cuisine" : "locality",
      selectedItem?.name,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getRestaurants({
        city,
        activeEntry: "dining",
        cuisine: isCuisinePage ? selectedItem.name : "",
        locality: isCuisinePage ? "" : selectedItem.name,
        page: pageParam,
        limit: 8,
        sortBy: "rating",
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: Boolean(selectedItem),
  })

  const restaurants =
    restaurantsQuery.data?.pages.flatMap((page) => page.items) || []
  const total = restaurantsQuery.data?.pages[0]?.total || 0

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground antialiased">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <Container>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to discover
          </Link>

          {!selectedItem ? (
            <div className="mt-8">
              <EmptyState
                title={isCuisinePage ? "Cuisine not found" : "Locality not found"}
                message="This browse page is not available. Return to discovery to explore other places."
                actionLabel="Explore restaurants"
                onAction={() => navigate("/")}
              />
            </div>
          ) : (
            <>
              <header className="mt-6 border-b border-slate-200 pb-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {isCuisinePage ? (
                      <Utensils className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {isCuisinePage ? "Explore by cuisine" : "Explore by neighbourhood"}
                    </p>
                    <h1 className="mt-1 text-2xl font-medium font-poppins tracking-tight text-slate-900 sm:text-4xl">
                      {isCuisinePage
                        ? `${selectedItem.name} restaurants in ${city}`
                        : `Restaurants & Cafes in ${selectedItem.name}`}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                      {isCuisinePage
                        ? `Discover ${selectedItem.name} food and restaurants in ${city}.`
                        : `Explore restaurants, cafes, and bars in ${selectedItem.name}, ${city}.`}
                      {total > 0 && ` ${total} places to explore.`}
                    </p>
                  </div>
                </div>
              </header>

              <section className="mt-7">
                {!isCuisinePage && restaurants.length > 0 && (
                  <h2 className="mb-5 text-xl font-medium font-poppins text-slate-900">
                    Restaurants & Cafes in {selectedItem.name}
                  </h2>
                )}
                {restaurantsQuery.isLoading ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }, (_, index) => (
                      <CardSkeleton key={index} variant="restaurant" />
                    ))}
                  </div>
                ) : restaurantsQuery.isError ? (
                  <ErrorState
                    title="Could not load restaurants"
                    message={restaurantsQuery.error?.message || "Please try again."}
                    onRetry={restaurantsQuery.refetch}
                  />
                ) : restaurants.length === 0 ? (
                  <EmptyState
                    icon={isCuisinePage ? Utensils : MapPin}
                    title={`No restaurants found ${isCuisinePage ? `for ${selectedItem.name}` : `in ${selectedItem.name}`}`}
                    message="There are no matching restaurants available right now. Explore other places from the home page."
                    actionLabel="Back to discovery"
                    onAction={() => navigate("/")}
                  />
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {restaurants.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                        />
                      ))}
                    </div>
                    {restaurantsQuery.hasNextPage && (
                      <div className="mt-10 flex justify-center">
                        <Button
                          variant="outline"
                          onClick={() => restaurantsQuery.fetchNextPage()}
                          disabled={restaurantsQuery.isFetchingNextPage}
                          className="h-12 min-w-[200px] rounded-full bg-white px-8 font-semibold"
                        >
                          {restaurantsQuery.isFetchingNextPage ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Load more restaurants"
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </section>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default PlaceBrowsePage
