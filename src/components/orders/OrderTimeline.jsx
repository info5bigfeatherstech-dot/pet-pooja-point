// src/components/orders/OrderTimeline.jsx - Visual timeline tracking order statuses
import React from "react"
import { Check, Clock, ChefHat, Bike, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { key: "placed", label: "Order Placed", icon: Clock },
  { key: "preparing", label: "Preparing Food", icon: ChefHat },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Bike },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
]

export function OrderTimeline({ status }) {
  if (status === "cancelled") {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex items-center gap-3">
        <XCircle className="w-5 h-5 text-destructive shrink-0" />
        <div className="text-left">
          <p className="text-xs sm:text-sm font-medium text-destructive font-poppins">
            This order was cancelled
          </p>
          <p className="text-[11px] text-muted-foreground font-subheader mt-0.5">
            If an online payment was made, the refund will be credited within 2-4 business days.
          </p>
        </div>
      </div>
    )
  }

  const currentIndex = steps.findIndex((s) => s.key === status)
  const activeIdx = currentIndex === -1 ? 0 : currentIndex

  return (
    <div className="py-2">
      <div className="flex items-center justify-between relative">
        {/* Background connecting bar */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -translate-y-1/2 z-0" />

        {/* Active progress bar */}
        <div
          className="absolute top-1/2 left-4 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(activeIdx / (steps.length - 1)) * 90}%` }}
        />

        {steps.map((step, idx) => {
          const isDone = idx < activeIdx
          const isCurrent = idx === activeIdx
          const Icon = step.icon

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10 text-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  isDone
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-background border-primary text-primary ring-4 ring-primary/20 shadow-xs"
                    : "bg-background border-border text-muted-foreground/60"
                )}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
              </div>

              <span
                className={cn(
                  "text-[10px] sm:text-xs mt-2 font-medium font-subheader whitespace-nowrap",
                  isCurrent
                    ? "text-primary"
                    : isDone
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderTimeline
