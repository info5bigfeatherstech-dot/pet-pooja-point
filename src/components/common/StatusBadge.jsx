// src/components/common/StatusBadge.jsx - Order status indicator badge using theme tokens
import React from "react"
import { Badge } from "@/components/ui/badge"
import { formatOrderStatus } from "@/utils/formatters"
import { cn } from "@/lib/utils"

export function StatusBadge({ status, className = "" }) {
  const getBadgeClass = (s) => {
    switch (s) {
      case "delivered":
        return "status-badge-delivered border"
      case "cancelled":
        return "status-badge-cancelled border"
      case "placed":
      case "preparing":
      case "out_for_delivery":
      default:
        return "status-badge-primary border"
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2.5 py-0.5 rounded-full text-[11px] font-medium font-subheader capitalize tracking-wide select-none",
        getBadgeClass(status),
        className
      )}
    >
      {formatOrderStatus(status)}
    </Badge>
  )
}

export default StatusBadge
