// src/components/layout/Container.jsx - Shared responsive max-width wrapper (1200px)
import React from "react"
import { cn } from "@/lib/utils"

export function Container({ children, className = "" }) {
  return (
    <div className={cn("container-main", className)}>
      {children}
    </div>
  )
}

export default Container
