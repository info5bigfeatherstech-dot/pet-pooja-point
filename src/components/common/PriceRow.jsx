// src/components/common/PriceRow.jsx - Consistent price row component for bills and orders
import React from "react"
import { formatCurrency } from "@/utils/formatters"
import { cn } from "@/lib/utils"

export function PriceRow({
  label,
  value,
  isDiscount = false,
  isFree = false,
  isTotal = false,
  subtitle,
  className = "",
}) {
  if (isTotal) {
    return (
      <div className={cn("price-row-total", className)}>
        <span className="text-foreground">{label}</span>
        <span className="text-foreground text-lg">{formatCurrency(value)}</span>
      </div>
    )
  }

  return (
    <div className={cn("price-row", className)}>
      <div className="flex flex-col">
        <span className="text-muted-foreground">{label}</span>
        {subtitle && <span className="text-[10px] text-muted-foreground/80">{subtitle}</span>}
      </div>

      <div>
        {isFree ? (
          <span className="text-emerald-600 font-medium tracking-wide text-xs">FREE</span>
        ) : isDiscount ? (
          <span className="text-emerald-600 font-medium">-{formatCurrency(value)}</span>
        ) : (
          <span className="text-foreground font-medium">{formatCurrency(value)}</span>
        )}
      </div>
    </div>
  )
}

export default PriceRow
