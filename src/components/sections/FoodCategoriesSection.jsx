import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Container from "../layout/Container"
import { Button } from "@/components/ui/button"
import { foodCategories } from "@/data/foodCategories"
import useFilterStore from "@/store/filterStore"

export function FoodCategoriesSection() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const currentCuisine = useFilterStore((state) => state.cuisine)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.slug || "burger"}`)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  // Split 16 items into 2 rows of 8
  const row1 = foodCategories.slice(0, 8)
  const row2 = foodCategories.slice(8, 16)

  return (
    <section className="py-8 md:py-12 bg-white">
      <Container>
        {/* Header with Title and Prev/Next Arrows */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium font-poppins text-foreground tracking-tight capitalize">
              Order our best food options
            </h2>
            <p className="text-sm font-subheader text-muted-foreground mt-1 capitalize">
              Top cravings and regional delicacies handpicked for your appetite
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous categories"
              onClick={() => handleScroll("left")}
              className="rounded-full w-9 h-9 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next categories"
              onClick={() => handleScroll("right")}
              className="rounded-full w-9 h-9 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-primary transition-all cursor-pointer shadow-xs"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 2-Row Scrollable Category Grid */}
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory space-y-6"
        >
          {/* Row 1 */}
          <div className="flex items-center gap-5 sm:gap-7 md:gap-8 min-w-max px-1">
            {row1.map((item) => {
              const isActive =
                currentCuisine &&
                currentCuisine.toLowerCase() === item.cuisine.toLowerCase()

              return (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item)}
                  className="group flex flex-col items-center cursor-pointer select-none snap-start"
                >
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-all duration-200 p-0.5 border-2 ${
                      isActive
                        ? "border-primary ring-2 ring-primary/30 scale-105"
                        : "border-transparent group-hover:border-primary group-hover:scale-105"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium font-subheader mt-2.5 text-center transition-colors max-w-[90px] sm:max-w-[110px] truncate ${
                      isActive ? "text-primary font-bold" : "text-slate-800 group-hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-5 sm:gap-7 md:gap-8 min-w-max px-1">
            {row2.map((item) => {
              const isActive =
                currentCuisine &&
                currentCuisine.toLowerCase() === item.cuisine.toLowerCase()

              return (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item)}
                  className="group flex flex-col items-center cursor-pointer select-none snap-start"
                >
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-all duration-200 p-0.5 border-2 ${
                      isActive
                        ? "border-primary ring-2 ring-primary/30 scale-105"
                        : "border-transparent group-hover:border-primary group-hover:scale-105"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium font-subheader mt-2.5 text-center transition-colors max-w-[90px] sm:max-w-[110px] truncate ${
                      isActive ? "text-primary font-bold" : "text-slate-800 group-hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FoodCategoriesSection
