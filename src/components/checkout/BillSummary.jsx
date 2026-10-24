// src/components/checkout/BillSummary.jsx - Bill breakdown component using PriceRow for checkout and order sheets
import React from "react"
import { Sparkles } from "lucide-react"
import PriceRow from "@/components/common/PriceRow"
import { formatCurrency } from "@/utils/formatters"
import { cn } from "@/lib/utils"

export function BillSummary({ bill, isReadOnly = false, className = "" }) {
  if (!bill) return null

  const {
    itemTotal = 0,
    deliveryFee = 0,
    platformFee = 5,
    tax = 0,
    discount = 0,
    tip = 0,
    grandTotal = 0,
  } = bill

  const remainingForFreeDelivery = Math.max(0, 399 - itemTotal)

  return (
    <div className={cn("space-y-3", className)}>
      {/* Free delivery threshold indicator (only in live checkout mode) */}
      {!isReadOnly && remainingForFreeDelivery > 0 && (
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-2 text-xs text-amber-900 font-subheader">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>
            Add <strong className="font-medium text-primary">{formatCurrency(remainingForFreeDelivery)}</strong> more to unlock FREE delivery!
          </span>
        </div>
      )}

      {/* Bill Items */}
      <div className="space-y-2 pt-1">
        <PriceRow label="Item Total" value={itemTotal} />
        
        <PriceRow
          label="Delivery Partner Fee"
          value={deliveryFee}
          isFree={deliveryFee === 0}
          subtitle={deliveryFee === 0 ? "Free delivery unlocked" : "Standard delivery"}
        />

        <PriceRow label="Platform Fee" value={platformFee} />
        
        <PriceRow label="GST & Restaurant Charges (5%)" value={tax} />

        {discount > 0 && (
          <PriceRow
            label="Coupon Discount"
            value={discount}
            isDiscount={true}
          />
        )}

        {tip > 0 && (
          <PriceRow label="Delivery Partner Tip" value={tip} />
        )}

        <PriceRow
          label={isReadOnly ? "Total Paid" : "To Pay"}
          value={grandTotal}
          isTotal={true}
        />
      </div>
    </div>
  )
}

export default BillSummary
