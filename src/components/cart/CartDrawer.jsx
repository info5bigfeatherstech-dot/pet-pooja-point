// src/components/cart/CartDrawer.jsx - Slide-over cart drawer with order summary & checkout
import React from "react"
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import useCartStore from "@/store/cartStore"
import DietaryBadge from "../common/DietaryBadge"

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore()

  if (!isCartOpen) return null

  const totalCount = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = totalCount > 0 ? 35 : 0
  const grandTotal = totalPrice + deliveryFee

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart()
      }}
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-poppins text-slate-900 leading-tight">
                Your Food Cart
              </h2>
              <p className="text-xs text-slate-500 font-subheader">
                {totalCount} {totalCount === 1 ? "item" : "items"} added
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-3">
              <ShoppingBag className="w-16 h-16 stroke-[1.2] text-slate-300" />
              <p className="text-sm font-medium font-poppins text-slate-600">Your cart is empty</p>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore delicious items from categories and customize them to your taste!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex gap-3 items-start justify-between shadow-2xs hover:border-slate-300 transition-colors"
              >
                {/* Left: Info */}
                <div className="flex gap-2.5 min-w-0 flex-1">
                  <DietaryBadge isVeg={item.isVeg ?? true} size="sm" className="mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold font-poppins text-slate-900 truncate">
                      {item.name}
                    </h4>
                    {item.summaryText && (
                      <p className="text-[11px] text-slate-500 font-subheader line-clamp-2 mt-0.5 leading-tight">
                        {item.summaryText}
                      </p>
                    )}
                    <span className="text-xs font-bold text-slate-900 mt-1 block">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Right: Quantity controls */}
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-2 py-1 shrink-0 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold font-mono text-slate-900 min-w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-white space-y-4">
            <div className="space-y-1.5 text-xs text-slate-600 font-subheader">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-100">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert("Order placed successfully! Thank you for dining with Tablefy.")
                clearCart()
                closeCart()
              }}
              className="w-full bg-[#0FA958] hover:bg-[#0c904a] text-white font-semibold font-subheader py-3.5 px-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Place Order (₹{grandTotal.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default CartDrawer
