// src/pages/HomePage.jsx - Main restaurant discovery home page with FoodCategoriesSection below hero
import React from "react"
import { useNavigate } from "react-router-dom"
import PageLayout from "@/components/layout/PageLayout"
import HeroSection from "@/components/sections/HeroSection"
import FoodCategoriesSection from "@/components/sections/FoodCategoriesSection"
import EntryCardsSection from "@/components/sections/EntryCardsSection"
import CollectionsSection from "@/components/sections/CollectionsSection"
import RestaurantGridSection from "@/components/sections/RestaurantGridSection"
import LinkPillsSection from "@/components/sections/LinkPillsSection"
import useLocalities from "@/hooks/useLocalities"
import useCuisines from "@/hooks/useCuisines"
import useLocationStore from "@/store/locationStore"

export function HomePage() {
  const navigate = useNavigate()
  const city = useLocationStore((state) => state.city)

  const { data: localities } = useLocalities()
  const { data: cuisines } = useCuisines()

  const handleCuisineClick = (item) => {
    navigate(`/cuisines/${item.name.toLowerCase().replace(/\s+/g, "-")}`)
  }

  const handleLocalityClick = (item) => {
    navigate(`/localities/${item.name.toLowerCase().replace(/\s+/g, "-")}`)
  }

  return (
    <PageLayout withContainer={false}>
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
          onItemClick={handleCuisineClick}
        />
    </PageLayout>
  )
}

export default HomePage
