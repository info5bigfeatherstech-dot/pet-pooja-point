import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, MapPin } from "lucide-react"
import Container from "@/components/layout/Container"
import PageLayout from "@/components/layout/PageLayout"
import RestaurantCard from "@/components/cards/RestaurantCard"
import EmptyState from "@/components/common/EmptyState"
import { Button } from "@/components/ui/button"
import { findCollectionBySlug } from "@/data/collections"
import { restaurants as allRestaurants } from "@/data/restaurants"
import useLocationStore from "@/store/locationStore"

export function CollectionPage() {
  const { collectionSlug } = useParams()
  const navigate = useNavigate()
  const city = useLocationStore((state) => state.city)
  const collection = findCollectionBySlug(collectionSlug)
  const restaurantById = new Map(
    allRestaurants.map((restaurant) => [restaurant.id, restaurant])
  )
  const featuredRestaurants = collection
    ? collection.restaurantIds
        .map((restaurantId) => restaurantById.get(restaurantId))
        .filter(Boolean)
    : []

  if (!collection) {
    return (
      <PageLayout>
        <div className="py-8">
          <EmptyState
            title="Collection not found"
            message="This collection may have moved. Browse all collections to find another place to explore."
            actionLabel="Browse collections"
            onAction={() => navigate("/collections")}
          />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout withContainer={false}>
      <Container className="py-8 md:py-12">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          All collections
        </Link>

        <header className="relative mt-6 flex min-h-64 items-end overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:min-h-80 sm:p-10">
          <img
            src={collection.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
          <div className="relative z-10 max-w-3xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Curated places in {city}
            </p>
            <h1 className="font-poppins text-3xl font-medium tracking-tight sm:text-5xl">
              {collection.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
              {collection.subtitle}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/85">
              <MapPin className="h-4 w-4 text-primary" />
              {collection.placesCount} places to discover in {city}
            </p>
          </div>
        </header>

        <section className="mt-9">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-poppins text-xl font-medium text-slate-900 sm:text-2xl">
                Places in {collection.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A handpicked selection to get you started.
              </p>
            </div>
            <span className="text-sm text-slate-500">
              {featuredRestaurants.length} featured places
            </span>
          </div>

          {featuredRestaurants.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No places in this collection yet"
              message="Check back soon for handpicked restaurants and cafes."
              actionLabel="Explore all collections"
              onAction={() => navigate("/collections")}
            />
          )}
        </section>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/collections">Explore more collections</Link>
          </Button>
        </div>
      </Container>
    </PageLayout>
  )
}

export default CollectionPage
