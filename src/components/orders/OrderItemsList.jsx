// src/components/orders/OrderItemsList.jsx - List of items in an order with veg badges and price
import React from "react"
import DietaryBadge from "@/components/common/DietaryBadge"
import { formatCurrency } from "@/utils/formatters"

export function OrderItemsList({ items = [] }) {
  if (!items || items.length === 0) return null

  return (
    <div className="space-y-2.5">
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className="flex items-center justify-between gap-3 py-1.5 border-b border-border/60 last:border-none text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <DietaryBadge isVeg={item.isVeg ?? true} size="sm" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium font-poppins text-foreground truncate">
                {item.name}
              </p>
              <p className="text-[11px] text-muted-foreground font-subheader">
                {item.qty} × {formatCurrency(item.price)}
              </p>
            </div>
          </div>

          <span className="text-xs sm:text-sm font-medium font-poppins text-foreground shrink-0">
            {formatCurrency(item.qty * item.price)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OrderItemsList
