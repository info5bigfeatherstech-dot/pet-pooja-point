import React from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, CreditCard, MapPin, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import BillSummary from "@/components/checkout/BillSummary"
import ErrorState from "@/components/common/ErrorState"
import CardSkeleton from "@/components/common/CardSkeleton"
import StatusBadge from "@/components/common/StatusBadge"
import OrderTimeline from "@/components/orders/OrderTimeline"
import OrderItemsList from "@/components/orders/OrderItemsList"
import { useOrder } from "@/hooks/useOrder"
import { formatDate } from "@/utils/formatters"

function getPaymentLabel(method) {
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

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const { data: order, isLoading, isError, refetch } = useOrder(orderId)

  return (
    <div className="space-y-5 text-left">
      <Button
        asChild
        variant="ghost"
        className="-ml-3 h-auto px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <Link to="/profile/orders">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to orders
        </Link>
      </Button>

      {isLoading ? (
        <CardSkeleton />
      ) : isError || !order ? (
        <ErrorState
          title="Order not found"
          message="We couldn't load this order. Return to your orders or try again."
          onRetry={refetch}
        />
      ) : (
        <>
          <header className="flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-xl sm:text-2xl font-medium font-poppins text-foreground">
                Order {order.orderNumber || order.id}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground font-subheader">
                Placed on {formatDate(order.placedAt)}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </header>

          <section className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-3">
            <img
              src={order.restaurant.image}
              alt={order.restaurant.name}
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h2 className="truncate text-sm font-medium font-poppins text-foreground">
                {order.restaurant.name}
              </h2>
              <p className="truncate text-xs text-muted-foreground font-subheader">
                {order.restaurant.locality}
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground font-subheader">
              Order Status
            </h2>
            <OrderTimeline status={order.status} />
          </section>

          <section className="space-y-3 border-t border-border pt-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground font-subheader">
              Items Ordered ({order.items?.length || 0})
            </h2>
            <OrderItemsList items={order.items} />
          </section>

          {order.address && (
            <section className="space-y-3 border-t border-border pt-5">
              <h2 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground font-subheader">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Delivery Address
              </h2>
              <div className="space-y-0.5 rounded-xl border border-border bg-muted/40 p-3 text-xs font-subheader">
                <p className="font-medium text-foreground capitalize">
                  {order.address.name} ({order.address.label})
                  {order.address.phone && ` • +91 ${order.address.phone}`}
                </p>
                <p className="text-muted-foreground">
                  {order.address.line1}
                  {order.address.line2 && `, ${order.address.line2}`}
                  {order.address.landmark && ` (${order.address.landmark})`}
                </p>
                <p className="text-muted-foreground">
                  {order.address.city} - {order.address.pincode}
                </p>
                {order.instructions && (
                  <p className="pt-1 font-medium text-primary">
                    Note: "{order.instructions}"
                  </p>
                )}
                {order.contactless && (
                  <p className="flex items-center gap-1 pt-0.5 text-emerald-600">
                    <ShieldCheck className="h-3 w-3" />
                    Contactless delivery requested
                  </p>
                )}
              </div>
            </section>
          )}

          <section className="space-y-3 border-t border-border pt-5">
            <h2 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground font-subheader">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              Payment Information
            </h2>
            <p className="rounded-xl border border-border bg-muted/40 p-3 text-xs font-medium font-subheader text-foreground">
              {getPaymentLabel(order.paymentMethod)}
            </p>
          </section>

          <section className="space-y-3 border-t border-border pt-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground font-subheader">
              Bill Details
            </h2>
            <BillSummary bill={order.bill} isReadOnly />
          </section>
        </>
      )}
    </div>
  )
}

export default OrderDetailsPage
