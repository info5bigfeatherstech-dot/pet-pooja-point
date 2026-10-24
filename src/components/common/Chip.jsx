// src/components/common/Chip.jsx - Pill filter & link chip component
import React from "react"
import { cn } from "@/lib/utils"

export function Chip({
  label,
  active = false,
  onClick,
  icon: Icon,
  count,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "chip cursor-pointer select-none",
        active && "chip-active",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
      <span>{label}</span>
      {count !== undefined && count !== null && (
        <span
          className={cn(
            "ml-2 text-xs font-normal opacity-70",
            active ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          ({count})
        </span>
      )}
    </button>
  )
}

export default Chip
