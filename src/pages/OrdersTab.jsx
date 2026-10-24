import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderCard from "@/components/orders/OrderCard"
import OrderDetailsSheet from "@/components/orders/OrderDetailsSheet"
import EmptyState from "@/components/common/EmptyState"
import ErrorState from "@/components/common/ErrorState"
import CardSkeleton from "@/components/common/CardSkeleton"
import { useOrders } from "@/hooks/useOrders"
import { useOrder } from "@/hooks/useOrder"

export function OrdersTab() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const orderIdParam = searchParams.get("orderId")
  const [statusTab, setStatusTab] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const { data: orders = [], isLoading, isError, refetch } = useOrders(statusTab)
  const { data: queriedOrder } = useOrder(orderIdParam)

  useEffect(() => {
    if (orderIdParam) {
      const match = orders.find((o) => o.id === orderIdParam) || queriedOrder
      if (match) {
        setSelectedOrder(match)
        setDetailsOpen(true)
      }
    }
  }, [orderIdParam, orders, queriedOrder])

  const handleCloseDetails = (open) => {
    setDetailsOpen(open)
    if (!open && orderIdParam) {
      searchParams.delete("orderId")
      setSearchParams(searchParams, { replace: true })
    }
  }

  return (
    <div className="space-y-6 text-left">
      {/* Tab Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-medium font-poppins text-foreground tracking-tight">
            Your Orders
          </h2>
          <p className="text-xs text-muted-foreground font-subheader mt-0.5">
            Track live deliveries, view past receipts, or reorder favorite meals.
          </p>
        </div>

        <Tabs value={statusTab} onValueChange={setStatusTab} className="w-auto">
          <TabsList className="bg-muted/70 rounded-xl p-1">
            <TabsTrigger value="all" className="rounded-lg text-xs font-medium px-3">
              All
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="rounded-lg text-xs font-medium px-3">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-lg text-xs font-medium px-3">
              Delivered
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="rounded-lg text-xs font-medium px-3">
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : isError ? (
        <ErrorState
          title="Could not load your orders"
          message="There was an issue fetching your order history. Please try again."
          onRetry={refetch}
        />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders yet"
          message="You haven't placed any orders in this category yet. Explore delicious dining options nearby!"
          actionLabel="Browse restaurants"
          onAction={() => navigate("/")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Sheet for direct URL link / selection */}
      {selectedOrder && (
        <OrderDetailsSheet
          order={selectedOrder}
          open={detailsOpen}
          onOpenChange={handleCloseDetails}
        />
      )}
    </div>
  )
}

export default OrdersTab
