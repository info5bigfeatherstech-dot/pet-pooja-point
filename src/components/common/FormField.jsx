// src/components/common/FormField.jsx - Reusable accessible form field wrapper
import React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormField({
  label,
  error,
  description,
  children,
  required = false,
  id,
  className = "",
}) {
  return (
    <div className={cn("space-y-1.5 text-left", className)}>
      {label && (
        <Label htmlFor={id} className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      {children}

      {description && !error && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}

      {error && (
        <p className="text-xs font-medium text-destructive animate-in fade-in">{error}</p>
      )}
    </div>
  )
}

export default FormField
