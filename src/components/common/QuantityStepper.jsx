// src/components/common/QuantityStepper.jsx - Quantity stepper for cart items
import React from "react"
import { Plus, Minus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuantityStepper({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 0,
  size = "md",
  className = "",
}) {
  const isSmall = size === "sm"
  const btnSize = isSmall ? "w-6 h-6" : "w-7 h-7"
  const iconSize = isSmall ? "w-3 h-3" : "w-3.5 h-3.5"

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 bg-background border border-border rounded-xl px-1.5 py-1 shadow-2xs select-none",
        className
      )}
    >
      <button
        type="button"
        aria-label={quantity === 1 && min === 0 ? "Remove item" : "Decrease quantity"}
        onClick={onDecrease}
        className={cn(
          "flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer",
          btnSize
        )}
      >
        {quantity === 1 && min === 0 ? (
          <Trash2 className={cn("text-destructive", iconSize)} />
        ) : (
          <Minus className={iconSize} />
        )}
      </button>

      <span
        className={cn(
          "font-medium font-poppins text-foreground text-center min-w-[20px]",
          isSmall ? "text-xs" : "text-sm"
        )}
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className={cn(
          "flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors cursor-pointer",
          btnSize
        )}
      >
        <Plus className={iconSize} />
      </button>
    </div>
  )
}

export default QuantityStepper
