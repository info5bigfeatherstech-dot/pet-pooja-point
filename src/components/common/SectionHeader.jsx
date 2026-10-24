// src/components/common/SectionHeader.jsx - Section header with Poppins title and Montreal subtitle
import React from "react"
import { cn } from "@/lib/utils"

export function SectionHeader({ title, subtitle, action, className = "" }) {
  if (!title && !subtitle && !action) return null

  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 md:mb-8", className)}>
      <div>
        {title && <h2 className="section-title font-poppins capitalize">{title}</h2>}
        {subtitle && <p className="section-subtitle font-subheader capitalize">{subtitle}</p>}
      </div>
      {action && (
        <div className="shrink-0 text-sm font-medium font-subheader text-primary hover:text-primary-hover transition-colors cursor-pointer">
          {action}
        </div>
      )}
    </div>
  )
}

export default SectionHeader
