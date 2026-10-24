// src/components/common/ErrorState.jsx - Error state display with retry trigger
import React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ErrorState({
  icon: Icon = AlertCircle,
  title = "Something went wrong",
  message = "Failed to load data. Please check your connection and try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-destructive/30 bg-card/40 my-6">
      <div className="w-14 h-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-medium font-poppins text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="rounded-full gap-2 border-border hover:border-primary"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  )
}

export default ErrorState
