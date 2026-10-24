// src/components/cart/FloatingCartBar.jsx - Floating pill showing cart summary when items exist
import React from "react"
import { ShoppingBag, ArrowRight } from "lucide-react"
import useCartStore from "@/store/cartStore"

export function FloatingCartBar() {
  const items = useCartStore((state) => state.items)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const openCart = useCartStore((state) => state.openCart)

  const totalCount = items.reduce(
    (total, item) => total + (item.qty || item.quantity || 1),
    0
  )
  const totalPrice = items.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || item.quantity || 1),
    0
  )

  if (totalCount === 0 || isCartOpen) return null

  return (
    <div className="fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-in slide-in-from-bottom-4 duration-200">
      <div
        onClick={openCart}
        className="pointer-events-auto bg-[#0FA958] hover:bg-[#0c904a] text-white rounded-2xl shadow-xl hover:shadow-2xl px-5 py-3.5 flex items-center justify-between gap-4 w-full max-w-md cursor-pointer transition-all active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-medium opacity-90 block leading-none">
              {totalCount} {totalCount === 1 ? "Item" : "Items"} added
            </span>
            <span className="text-sm sm:text-base font-medium font-poppins">
              ₹{totalPrice.toFixed(2)} plus taxes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-medium font-subheader text-sm bg-black/15 px-3 py-1.5 rounded-xl">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

export default FloatingCartBar
