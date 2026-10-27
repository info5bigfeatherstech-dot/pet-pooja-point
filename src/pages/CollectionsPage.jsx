import React from "react"
import { Link } from "react-router-dom"
import Container from "@/components/layout/Container"
import PageLayout from "@/components/layout/PageLayout"
import SectionHeader from "@/components/common/SectionHeader"
import CollectionCard from "@/components/cards/CollectionCard"
import CardSkeleton from "@/components/common/CardSkeleton"
import EmptyState from "@/components/common/EmptyState"
import ErrorState from "@/components/common/ErrorState"
import useCollections from "@/hooks/useCollections"
import useLocationStore from "@/store/locationStore"

export function CollectionsPage() {
  const city = useLocationStore((state) => state.city)
  const { data: collections, isLoading, isError, error, refetch } = useCollections()

  return (
    <PageLayout withContainer={false}>
      <Container className="py-8 md:py-12">
        <Link
          to="/"
          className="text-sm text-slate-500 transition-colors hover:text-primary"
        >
          ← Back to discover
        </Link>
        <div className="mt-6">
          <SectionHeader
            title={`Collections in ${city}`}
            subtitle={`Explore handpicked restaurants, cafes, pubs, and bars across ${city}.`}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <CardSkeleton key={index} variant="collection" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load collections"
            message={error?.message || "We could not fetch the curated collections at this time."}
            onRetry={refetch}
          />
        ) : collections?.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No collections available"
            message={`There are no curated collections to show for ${city} right now.`}
            actionLabel="Back to discover"
            onAction={() => window.history.back()}
          />
        )}
      </Container>
    </PageLayout>
  )
}

export default CollectionsPage
