// src/components/common/EmptyState.jsx - Empty state placeholder with icon and message
import React from "react"
import { UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState({
  icon: Icon = UtensilsCrossed,
  title = "No restaurants found",
  message = "Try clearing your filters or searching for something else.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-border bg-card/40 my-6">
      <div className="w-14 h-14 rounded-full bg-secondary/60 flex items-center justify-center text-primary mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-medium font-poppins text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction} className="rounded-full">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
