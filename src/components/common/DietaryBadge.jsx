// src/components/common/DietaryBadge.jsx - Standard Indian Veg / Non-Veg food indicator symbol
import React from "react"

export function DietaryBadge({ isVeg, size = "md", className = "" }) {
  const isSmall = size === "sm"
  const isLarge = size === "lg"

  const boxSize = isSmall ? "w-3.5 h-3.5" : isLarge ? "w-5 h-5" : "w-4 h-4"
  const innerDot = isSmall ? "w-1.5 h-1.5" : isLarge ? "w-2.5 h-2.5" : "w-2 h-2"

  if (isVeg) {
    return (
      <span
        title="Pure Vegetarian"
        className={`inline-flex items-center justify-center border-2 border-emerald-600 rounded-[3px] bg-white p-0.5 shrink-0 ${boxSize} ${className}`}
      >
        <span className={`rounded-full bg-emerald-600 shrink-0 ${innerDot}`} />
      </span>
    )
  }

  return (
    <span
      title="Non-Vegetarian"
      className={`inline-flex items-center justify-center border-2 border-rose-600 rounded-[3px] bg-white p-0.5 shrink-0 ${boxSize} ${className}`}
    >
      <span
        className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-rose-600 shrink-0`}
      />
    </span>
  )
}

export default DietaryBadge
