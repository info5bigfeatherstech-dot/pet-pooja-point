// src/components/cart/CartToaster.jsx - Premium animated toast notification when items are added to cart
import React, { useEffect } from "react"
import { CheckCircle2, X, ArrowRight, ShoppingBag } from "lucide-react"
import useCartStore from "@/store/cartStore"
import DietaryBadge from "../common/DietaryBadge"

export function CartToaster() {
  const toast = useCartStore((state) => state.toast)
  const hideToast = useCartStore((state) => state.hideToast)
  const openCart = useCartStore((state) => state.openCart)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3800)
      return () => clearTimeout(timer)
    }
  }, [toast, hideToast])

  if (!toast) return null

  return (
    <aside
      aria-label="Cart Notification"
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 max-w-[380px] w-[calc(100vw-24px)] sm:w-full animate-in slide-in-from-bottom-4 sm:slide-in-from-right-4 fade-in duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xl p-3.5 sm:p-4 relative overflow-hidden">
        
        {/* Animated green progress bar at the top edge */}
        <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500/20">
          <div className="h-full bg-emerald-500 animate-[shrink_3.8s_linear_forwards]" />
        </div>

        {/* Header row: Checkmark badge & close button */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </span>
            <span>Added to your cart</span>
          </div>

          <button
            type="button"
            onClick={hideToast}
            aria-label="Dismiss toast"
            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content row: Image, Name, Customisations & View Cart */}
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 shadow-2xs">
            <img
              src={toast.image}
              alt={toast.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <DietaryBadge isVeg={toast.isVeg ?? true} size="sm" />
              <h4 className="text-xs sm:text-sm font-medium font-poppins text-slate-900 truncate">
                {toast.name}
              </h4>
            </div>

            {toast.summaryText ? (
              <p className="text-[11px] text-slate-500 font-subheader truncate mt-0.5">
                {toast.summaryText}
              </p>
            ) : null}

            <span className="text-xs font-medium font-poppins text-slate-900 block mt-0.5">
              ₹{toast.price}
            </span>
          </div>

          {/* Action: View Cart */}
          <button
            type="button"
            onClick={() => {
              hideToast()
              openCart()
            }}
            className="bg-[#0FA958] hover:bg-[#0c904a] text-white text-xs font-medium font-subheader px-3 py-2 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1 shrink-0 cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </aside>
  )
}

export default CartToaster
