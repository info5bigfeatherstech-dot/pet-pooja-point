// src/components/checkout/CheckoutStepCard.jsx - Panel card for checkout steps with step numbering and summary
import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function CheckoutStepCard({
  stepNumber,
  title,
  subtitle,
  isComplete = false,
  children,
  className = "",
}) {
  return (
    <div className={cn("panel text-left space-y-4", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center font-medium font-poppins text-xs shrink-0 transition-colors",
              isComplete
                ? "bg-emerald-500 text-white"
                : "bg-primary text-primary-foreground"
            )}
          >
            {isComplete ? <Check className="w-4 h-4 stroke-[2.5]" /> : stepNumber}
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-medium font-poppins text-foreground tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground font-subheader">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {isComplete && (
          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-subheader">
            Completed
          </span>
        )}
      </div>

      <div>{children}</div>
    </div>
  )
}

export default CheckoutStepCard
