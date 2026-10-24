// src/pages/HomePage.jsx - Main restaurant discovery home page with FoodCategoriesSection below hero
import React from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/sections/HeroSection"
import FoodCategoriesSection from "@/components/sections/FoodCategoriesSection"
import EntryCardsSection from "@/components/sections/EntryCardsSection"
import CollectionsSection from "@/components/sections/CollectionsSection"
import RestaurantGridSection from "@/components/sections/RestaurantGridSection"
import LinkPillsSection from "@/components/sections/LinkPillsSection"
import useLocalities from "@/hooks/useLocalities"
import useCuisines from "@/hooks/useCuisines"
import useLocationStore from "@/store/locationStore"
import useFilterStore from "@/store/filterStore"

export function HomePage() {
  const city = useLocationStore((state) => state.city)
  const currentCuisine = useFilterStore((state) => state.cuisine)
  const setCuisine = useFilterStore((state) => state.setCuisine)
  const setSearch = useFilterStore((state) => state.setSearch)

  const { data: localities } = useLocalities()
  const { data: cuisines } = useCuisines()

  const handleCuisineClick = (item) => {
    if (currentCuisine && currentCuisine.toLowerCase() === item.name.toLowerCase()) {
      setCuisine("")
    } else {
      setCuisine(item.name)
    }

    const el = document.getElementById("restaurants-grid")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLocalityClick = (item) => {
    setSearch(item.name)
    const el = document.getElementById("restaurants-grid")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground antialiased">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1 bg-white text-foreground">
        {/* 2. HeroSection */}
        <HeroSection />

        {/* 3. FoodCategoriesSection ("Order our best food options") */}
        <FoodCategoriesSection />

        {/* 4. EntryCardsSection */}
        <EntryCardsSection />

        {/* 5. CollectionsSection */}
        <CollectionsSection />

        {/* 6. RestaurantGridSection (includes FilterBar) */}
        <RestaurantGridSection />

        {/* 7. LinkPillsSection - Localities */}
        <LinkPillsSection
          id="localities"
          title={`Popular localities in and around ${city}`}
          subtitle="Explore restaurants, cafes, and bars by popular neighborhoods"
          items={localities || []}
          onItemClick={handleLocalityClick}
        />

        {/* 7. LinkPillsSection - Cuisines */}
        <LinkPillsSection
          id="cuisines"
          title="Popular cuisines"
          subtitle="Explore dishes and menus across trending domestic and international cuisines"
          items={cuisines || []}
          activeItem={currentCuisine}
          onItemClick={handleCuisineClick}
        />
      </main>

      {/* 8. Footer (dark) */}
      <Footer />
    </div>
  )
}

export default HomePage
