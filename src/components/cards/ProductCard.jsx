// src/components/cards/ProductCard.jsx - Food product card with customizable ADD button
import React from "react"
import { Link } from "react-router-dom"
import { Star, Plus, Flame, Clock } from "lucide-react"
import DietaryBadge from "../common/DietaryBadge"
import useCartStore from "@/store/cartStore"

export function ProductCard({ product }) {
  const openCustomise = useCartStore((state) => state.openCustomise)

  if (!product) return null

  const {
    id,
    name,
    slug,
    basePrice,
    rating,
    ratingCount,
    isVeg,
    image,
    description,
    prepTime,
  } = product

  const hasCustomizations = product.customizationGroups?.length > 0

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group">
      
      {/* Top Details & Image */}
      <div className="flex gap-4 items-start justify-between">
        
        {/* Left: Info */}
        <div className="flex-1 space-y-1.5 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <DietaryBadge isVeg={isVeg} size="md" />
            {rating && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-subheader">
                <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                {rating}
                {ratingCount && (
                  <span className="text-slate-400 font-normal">({ratingCount})</span>
                )}
              </span>
            )}
          </div>

          <Link
            to={`/product/${id}`}
            className="block text-base sm:text-lg font-medium font-poppins text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2"
          >
            {name}
          </Link>

          <div className="text-sm font-medium font-poppins text-slate-900">
            ₹{basePrice}
          </div>

          {description && (
            <p className="text-xs text-slate-500 font-subheader line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {prepTime && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-subheader pt-1">
              <Clock className="w-3 h-3" />
              {prepTime}
            </span>
          )}
        </div>

        {/* Right: Image & Floating ADD button */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
          <Link to={`/product/${id}`} className="block w-full h-full">
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* ADD Button container positioned at bottom center of the image */}
          <div className="absolute -bottom-1 inset-x-0 flex flex-col items-center">
            <button
              type="button"
              onClick={() => openCustomise(product)}
              className="bg-white hover:bg-slate-50 text-emerald-600 border border-slate-200 hover:border-emerald-500 font-medium font-poppins text-xs sm:text-sm px-4 sm:px-6 py-1.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 uppercase tracking-wider"
            >
              <span>ADD</span>
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
            {hasCustomizations && (
              <span className="text-[9px] font-semibold text-slate-500 bg-white/95 px-1.5 py-0.2 rounded-full mt-0.5 shadow-2xs">
                customisable
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default ProductCard
