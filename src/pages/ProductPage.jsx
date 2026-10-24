import React, { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star, Clock, Flame, ShieldCheck, Plus, Sparkles, ChefHat } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Container from "@/components/layout/Container"
import DietaryBadge from "@/components/common/DietaryBadge"
import ProductCard from "@/components/cards/ProductCard"
import { getProductById, products } from "@/data/products"
import useCartStore from "@/store/cartStore"

export function ProductPage() {
  const { productId } = useParams()
  const openCustomise = useCartStore((state) => state.openCustomise)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [productId])

  const product = getProductById(productId) || products[0]

  const {
    id,
    name,
    basePrice,
    rating,
    ratingCount,
    isVeg,
    image,
    description,
    prepTime,
    calories,
    categoryName,
    categoryId,
    customizationGroups = [],
  } = product

  // Other items in same category
  const relatedItems = products
    .filter((p) => p.categoryId === categoryId && p.id !== id)
    .slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-foreground antialiased">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 pb-24">
        <Container>
          
          {/* Breadcrumb Navigation */}
          <div className="py-4 flex items-center gap-2 text-xs font-subheader text-slate-500">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <Link to={`/category/${categoryId}`} className="hover:text-primary transition-colors">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-xs">{name}</span>
          </div>

          {/* Product Overview Split Layout */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left: Product Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-semibold text-slate-800 shadow-md font-subheader">
                  <DietaryBadge isVeg={isVeg} size="sm" />
                  <span>{isVeg ? "100% Pure Veg" : "Non-Vegetarian"}</span>
                </span>
              </div>
            </div>

            {/* Right: Info & Actions */}
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-primary font-subheader bg-primary/10 px-2.5 py-1 rounded-full">
                    {categoryName}
                  </span>
                  {rating && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-subheader">
                      <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      {rating} ({ratingCount} reviews)
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-slate-900 leading-tight">
                  {name}
                </h1>

                <div className="text-2xl sm:text-3xl font-medium font-poppins text-slate-900">
                  ₹{basePrice}
                </div>

                <p className="text-sm text-slate-600 font-subheader leading-relaxed">
                  {description}
                </p>

                {/* Key Attributes Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {prepTime && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-subheader">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{prepTime}</span>
                    </div>
                  )}
                  {calories && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-subheader">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>{calories}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-subheader">
                    <ChefHat className="w-3.5 h-3.5 text-primary" />
                    <span>Prepared Fresh</span>
                  </div>
                </div>
              </div>

              {/* Customisation Highlights & Trigger Button */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {customizationGroups.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-subheader block">
                      Customisation options available:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {customizationGroups.map((g) => (
                        <span
                          key={g.id}
                          className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-subheader"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => openCustomise(product)}
                  className="w-full bg-[#0FA958] hover:bg-[#0c904a] active:scale-[0.99] text-white font-medium font-subheader text-base py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  <span>Customise as per your taste</span>
                </button>
              </div>

            </div>

          </div>

          {/* Related Items Section */}
          {relatedItems.length > 0 && (
            <div className="mt-12 space-y-6">
              <h3 className="text-xl sm:text-2xl font-medium font-poppins text-slate-900">
                You might also enjoy in {categoryName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {relatedItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}

        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ProductPage
