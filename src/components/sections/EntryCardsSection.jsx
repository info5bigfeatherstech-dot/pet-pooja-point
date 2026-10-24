// src/components/sections/EntryCardsSection.jsx - 3 Entry pathway cards (Order Online, Dining, Nightlife)
import React from "react"
import Container from "../layout/Container"
import EntryCard from "../cards/EntryCard"
import { entryCards } from "@/data/entryCards"

export function EntryCardsSection() {
  return (
    <section className="py-6 md:py-8 bg-white">
      <Container>
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory">
          {entryCards.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-1 snap-center"
            >
              <EntryCard item={item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default EntryCardsSection
