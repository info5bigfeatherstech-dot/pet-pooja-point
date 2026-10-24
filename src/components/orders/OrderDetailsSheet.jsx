// src/components/orders/OrderDetailsSheet.jsx - Slide-over sheet displaying complete order details
import React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import StatusBadge from "@/components/common/StatusBadge"
import OrderTimeline from "./OrderTimeline"
import OrderItemsList from "./OrderItemsList"
import BillSummary from "@/components/checkout/BillSummary"
import { formatDate } from "@/utils/formatters"
import { MapPin, CreditCard, ShieldCheck } from "lucide-react"

export function OrderDetailsSheet({ order, open, onOpenChange }) {
  if (!order) return null

  const {
    orderNumber,
    restaurant,
    items,
    status,
    placedAt,
    address,
    paymentMethod,
    instructions,
    contactless,
    bill,
  } = order

  const getPaymentLabel = (method) => {
    switch (method?.toLowerCase()) {
      case "upi":
        return "Paid via UPI / QR"
      case "card":
        return "Paid via Credit / Debit Card"
      case "cod":
        return "Cash on Delivery"
      default:
        return "Online Payment"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-6 flex flex-col justify-between overflow-y-auto"
      >
        <div className="space-y-6 text-left">
          {/* Header */}
          <SheetHeader className="text-left space-y-1">
            <div className="flex items-center justify-between gap-2">
              <SheetTitle className="text-xl font-medium font-poppins text-foreground">
                {orderNumber}
              </SheetTitle>
              <StatusBadge status={status} />
            </div>
            <SheetDescription className="text-xs text-muted-foreground font-subheader">
              Placed on {formatDate(placedAt)}
            </SheetDescription>
          </SheetHeader>

          {/* Restaurant Banner */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-medium font-poppins text-foreground truncate">
                {restaurant.name}
              </h4>
              <p className="text-xs text-muted-foreground font-subheader truncate">
                {restaurant.locality}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-subheader">
              Order Status
            </h5>
            <OrderTimeline status={status} />
          </div>

          <Separator />

          {/* Items */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-subheader">
              Items Ordered ({items?.length || 0})
            </h5>
            <OrderItemsList items={items} />
          </div>

          <Separator />

          {/* Delivery Address */}
          {address && (
            <div className="space-y-2 text-left">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-subheader flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Delivery Address
              </h5>
              <div className="p-3 bg-muted/40 rounded-xl border border-border text-xs font-subheader space-y-0.5">
                <p className="font-medium text-foreground capitalize">
                  {address.name} ({address.label}) • +91 {address.phone}
                </p>
                <p className="text-muted-foreground">
                  {address.line1}
                  {address.line2 && `, ${address.line2}`}
                  {address.landmark && ` (${address.landmark})`}
                </p>
                <p className="text-muted-foreground">
                  {address.city} - {address.pincode}
                </p>
                {instructions && (
                  <p className="text-primary pt-1 font-medium">
                    Note: "{instructions}"
                  </p>
                )}
                {contactless && (
                  <p className="text-emerald-600 flex items-center gap-1 pt-0.5">
                    <ShieldCheck className="w-3 h-3" /> Contactless delivery requested
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-1.5">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-subheader flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-primary" />
              Payment Information
            </h5>
            <div className="p-2.5 bg-muted/40 rounded-xl border border-border text-xs font-medium font-subheader text-foreground">
              {getPaymentLabel(paymentMethod)}
            </div>
          </div>

          <Separator />

          {/* Bill Summary */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-subheader">
              Bill Details
            </h5>
            <BillSummary bill={bill} isReadOnly={true} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default OrderDetailsSheet
