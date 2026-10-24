// src/components/checkout/CartItemRow.jsx - Row in order summary with veg badge, name, QuantityStepper, and line price
import React from "react"
import DietaryBadge from "@/components/common/DietaryBadge"
import QuantityStepper from "@/components/common/QuantityStepper"
import { formatCurrency } from "@/utils/formatters"
import useCartStore from "@/store/cartStore"

export function CartItemRow({ item }) {
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)

  if (!item) return null

  const itemId = item.id || item.cartItemId
  const name = item.name || "Item"
  const price = typeof item.price === "number" && !isNaN(item.price) ? item.price : 0
  const qty = typeof (item.qty || item.quantity) === "number" && !isNaN(item.qty || item.quantity) ? (item.qty || item.quantity) : 1
  const isVeg = item.isVeg ?? true

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-border/60 last:border-none text-left">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <DietaryBadge isVeg={isVeg} size="sm" />
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium font-poppins text-foreground truncate">
            {name}
          </p>
          <p className="text-[11px] text-muted-foreground font-subheader">
            {formatCurrency(price)} each
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <QuantityStepper
          quantity={qty}
          onIncrease={() => increaseQty(itemId)}
          onDecrease={() => decreaseQty(itemId)}
          size="sm"
        />
        <span className="text-xs sm:text-sm font-medium font-poppins text-foreground min-w-[50px] text-right">
          {formatCurrency(price * qty)}
        </span>
      </div>
    </div>
  )
}

export default CartItemRow
