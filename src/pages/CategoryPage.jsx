import React, { useState, useMemo, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, SlidersHorizontal, Sparkles } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Container from "@/components/layout/Container"
import ProductCard from "@/components/cards/ProductCard"
import DietaryBadge from "@/components/common/DietaryBadge"
import { products, getProductsByCategory } from "@/data/products"
import { foodCategories } from "@/data/foodCategories"

export function CategoryPage() {
  const { categoryId = "burger" } = useParams()
  const [filterType, setFilterType] = useState("all") // 'all' | 'veg' | 'non-veg' | 'under-300'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [categoryId])

  // Match category details
  const currentCategory = useMemo(() => {
    return (
      foodCategories.find(
        (c) => c.slug === categoryId || c.name.toLowerCase() === categoryId.toLowerCase()
      ) || {
        name: categoryId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        slug: categoryId,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      }
    )
  }, [categoryId])

  // Get products strictly matching this category only
  const categoryProducts = useMemo(() => {
    return getProductsByCategory(categoryId)
  }, [categoryId])

  // Filtered products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      if (filterType === "veg") return p.isVeg === true
      if (filterType === "non-veg") return p.isVeg === false
      if (filterType === "under-300") return (p.basePrice || p.price) <= 300
      return true
    })
  }, [categoryProducts, filterType])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-foreground antialiased">
      {/* 1. Sticky Navbar */}
      <Navbar />

      <main className="flex-1 pb-20">
        <Container>
          
          {/* Breadcrumb & Back Link */}
          <div className="py-4 flex items-center justify-between text-xs font-subheader text-slate-500">
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">{currentCategory.name}</span>
            </div>
            <span className="text-slate-400 font-mono">
              {filteredProducts.length} items found
            </span>
          </div>

          {/* Category Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 text-white p-6 sm:p-10 mb-8 shadow-xl">
            {/* Background artwork */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 md:opacity-40 overflow-hidden pointer-events-none">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-orange-200 border border-primary/30 text-xs font-semibold uppercase tracking-wider font-subheader">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Featured Category
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-poppins tracking-tight">
                {currentCategory.name} Delights
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-subheader leading-relaxed">
                Handcrafted gourmet recipes prepared fresh to order. Customize your patty, choice of bread, ice level & toppings exactly as you like!
              </p>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-6">
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-subheader transition-all cursor-pointer ${
                filterType === "all"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              All Items ({categoryProducts.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterType("veg")}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-subheader transition-all flex items-center gap-2 cursor-pointer ${
                filterType === "veg"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <DietaryBadge isVeg={true} size="sm" />
              <span>Veg Only</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterType("non-veg")}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-subheader transition-all flex items-center gap-2 cursor-pointer ${
                filterType === "non-veg"
                  ? "bg-rose-600 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <DietaryBadge isVeg={false} size="sm" />
              <span>Non-Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterType("under-300")}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-subheader transition-all cursor-pointer ${
                filterType === "under-300"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              Under ₹300
            </button>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
              <p className="text-slate-500 font-subheader text-sm">
                No items match this filter criteria.
              </p>
              <button
                type="button"
                onClick={() => setFilterType("all")}
                className="mt-3 text-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CategoryPage
