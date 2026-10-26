// src/components/orders/OrderCard.jsx - Card showing summary of a placed order with Reorder and Details actions
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotateCcw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/common/StatusBadge"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { formatDate, formatCurrency } from "@/utils/formatters"
import useCartStore from "@/store/cartStore"

export function OrderCard({ order }) {
  const navigate = useNavigate()
  const { items: cartItems, addItem, clearCart } = useCartStore()
  const [reorderConfirmOpen, setReorderConfirmOpen] = useState(false)

  if (!order) return null

  const { restaurant, items = [], status, placedAt, bill } = order

  // One-line items summary e.g. "2 x Butter Chicken, 1 x Naan +2 more"
  const getItemsSummary = () => {
    if (!items || items.length === 0) return "No items"
    const firstTwo = items.slice(0, 2).map((i) => `${i.qty} × ${i.name}`)
    const remaining = items.length - 2
    if (remaining > 0) {
      return `${firstTwo.join(", ")} +${remaining} more`
    }
    return firstTwo.join(", ")
  }

  const executeReorder = () => {
    clearCart()
    items.forEach((item) => {
      addItem(restaurant, item)
    })
    navigate("/checkout")
  }

  const handleReorderClick = () => {
    if (cartItems.length > 0) {
      setReorderConfirmOpen(true)
    } else {
      executeReorder()
    }
  }

  return (
    <>
      <div className="panel flex flex-col justify-between hover:border-primary/50 transition-all duration-200 text-left">
        {/* Top: Restaurant + Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
            />
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-medium font-poppins text-foreground truncate">
                {restaurant.name}
              </h4>
              <p className="text-xs text-muted-foreground font-subheader truncate">
                {restaurant.locality}
              </p>
            </div>
          </div>

          <StatusBadge status={status} />
        </div>

        {/* Middle: Items summary & Date */}
        <div className="py-2.5 border-y border-border/70 my-1 space-y-1">
          <p className="text-xs sm:text-sm font-medium font-subheader text-foreground line-clamp-1">
            {getItemsSummary()}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-subheader">
            <span>Placed on {formatDate(placedAt)}</span>
            <span className="font-medium font-poppins text-foreground">
              Total: {formatCurrency(bill?.grandTotal || 0)}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 flex items-center justify-end gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/profile/orders/${order.id}`)}
            className="rounded-xl font-medium text-xs h-8 px-3"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            View details
          </Button>

          <Button
            size="sm"
            onClick={handleReorderClick}
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-medium text-xs h-8 px-3.5"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reorder
          </Button>
        </div>
      </div>

      {/* Confirm replace cart dialog */}
      <ConfirmDialog
        open={reorderConfirmOpen}
        onOpenChange={setReorderConfirmOpen}
        title="Replace cart items?"
        description="Your cart contains items from another order. Would you like to clear the current cart and reorder this feast?"
        confirmText="Replace & Reorder"
        cancelText="Cancel"
        onConfirm={executeReorder}
      />
    </>
  )
}

export default OrderCard
