// src/components/sections/CollectionsSection.jsx - Carousel displaying curated restaurant collections
import React from "react"
import Container from "../layout/Container"
import SectionHeader from "../common/SectionHeader"
import CollectionCard from "../cards/CollectionCard"
import CardSkeleton from "../common/CardSkeleton"
import ErrorState from "../common/ErrorState"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useCollections from "@/hooks/useCollections"
import useLocationStore from "@/store/locationStore"

export function CollectionsSection() {
  const city = useLocationStore((state) => state.city)
  const { data: collections, isLoading, isError, refetch } = useCollections()

  return (
    <section id="collections" className="py-10 md:py-14 bg-white">
      <Container>
        <SectionHeader
          title="Collections"
          subtitle={`Explore curated lists of top restaurants, cafes, pubs, and bars in ${city}, based on trends`}
          action={<span>All collections in {city} →</span>}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} variant="collection" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load collections"
            message="We could not fetch the curated collections at this time."
            onRetry={refetch}
          />
        ) : (
          <div className="relative px-2 sm:px-0">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {collections?.map((col) => (
                  <CarouselItem
                    key={col.id}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <CollectionCard collection={col} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="left-2 bg-white hover:bg-slate-50 border-border text-foreground hover:text-primary -translate-x-1/2 shadow-md cursor-pointer" />
                <CarouselNext className="right-2 bg-white hover:bg-slate-50 border-border text-foreground hover:text-primary translate-x-1/2 shadow-md cursor-pointer" />
              </div>
            </Carousel>
          </div>
        )}
      </Container>
    </section>
  )
}

export default CollectionsSection
