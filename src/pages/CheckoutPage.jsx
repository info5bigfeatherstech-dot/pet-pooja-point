// src/pages/CheckoutPage.jsx - Food delivery checkout page with multi-step accordion and live bill summary
import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react"
import PageLayout from "@/components/layout/PageLayout"
import CheckoutStepCard from "@/components/checkout/CheckoutStepCard"
import AddressSelector from "@/components/address/AddressSelector"
import DeliveryOptions from "@/components/checkout/DeliveryOptions"
import PaymentMethods from "@/components/checkout/PaymentMethods"
import CartItemRow from "@/components/checkout/CartItemRow"
import CouponBox from "@/components/checkout/CouponBox"
import BillSummary from "@/components/checkout/BillSummary"
import EmptyState from "@/components/common/EmptyState"
import { Button } from "@/components/ui/button"
import { useAddresses } from "@/hooks/useAddresses"
import { usePlaceOrder } from "@/hooks/useOrders"
import useCartStore from "@/store/cartStore"
import useCheckoutStore from "@/store/checkoutStore"
import { calculateBill } from "@/utils/billCalculator"
import { formatCurrency } from "@/utils/formatters"

export function CheckoutPage() {
  const navigate = useNavigate()
  const { restaurant, items = [], clearCart } = useCartStore()
  const { data: addresses = [] } = useAddresses()

  const {
    selectedAddressId,
    setSelectedAddressId,
    paymentMethod,
    tip,
    instructions,
    contactless,
    appliedCoupon,
    reset: resetCheckout,
  } = useCheckoutStore()

  const placeOrderMutation = usePlaceOrder()

  const itemTotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 0), 0)
  const bill = calculateBill({
    itemTotal,
    coupon: appliedCoupon,
    tip,
  })

  // Selected address object
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0]

  const isAddressComplete = Boolean(selectedAddressId)
  const isPaymentComplete = Boolean(paymentMethod)
  const canPlaceOrder = items.length > 0 && isAddressComplete && isPaymentComplete && !placeOrderMutation.isPending

  const handlePlaceOrder = async () => {
    if (!canPlaceOrder) return

    const orderPayload = {
      restaurant: restaurant || {
        id: "rest-1",
        name: "The Imperial Spice",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
        locality: "Connaught Place",
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        isVeg: i.isVeg ?? true,
      })),
      address: selectedAddress,
      paymentMethod,
      instructions,
      contactless,
      bill,
    }

    try {
      const placed = await placeOrderMutation.mutateAsync(orderPayload)
      clearCart()
      resetCheckout()
      navigate(`/order-success/${placed.id}`)
    } catch (err) {
      // Toast is handled by hook
    }
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <PageLayout className="pt-8 pb-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          message="Good food is always waiting for you! Add dishes from your favorite dining spots to place an order."
          actionLabel="Explore restaurants & menu"
          onAction={() => navigate("/")}
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout className="pt-6 pb-24 lg:pb-16">
      {/* Top Breadcrumb */}
      <div className="py-2 mb-4 flex items-center gap-2 text-xs font-subheader text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Checkout</span>
      </div>

      <div className="text-left mb-6">
        <h1 className="page-title">Delivery Checkout</h1>
        <p className="text-xs text-muted-foreground font-subheader mt-1">
          Review your delivery details, payment method, and food order summary.
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 2/3: Checkout Steps */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          
          {/* Step 1: Delivery Address */}
          <CheckoutStepCard
            stepNumber="1"
            title="Delivery Address"
            subtitle="Choose or add an address where your meal should be delivered"
            isComplete={isAddressComplete}
          >
            <AddressSelector
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
            />
          </CheckoutStepCard>

          {/* Step 2: Delivery Options */}
          <CheckoutStepCard
            stepNumber="2"
            title="Delivery Options & Instructions"
            subtitle="Rider notes, contactless request, and tips"
            isComplete={true}
          >
            <DeliveryOptions />
          </CheckoutStepCard>

          {/* Step 3: Payment Method */}
          <CheckoutStepCard
            stepNumber="3"
            title="Payment Method"
            subtitle="Choose how you'd like to pay for your meal"
            isComplete={isPaymentComplete}
          >
            <PaymentMethods />
          </CheckoutStepCard>
        </div>

        {/* Right 1/3: Sticky Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="panel lg:sticky lg:top-24 space-y-5 text-left shadow-sm">
            
            {/* Restaurant Info Header */}
            {restaurant && (
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
                />
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-medium font-poppins text-foreground truncate">
                    {restaurant.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-subheader truncate">
                    {restaurant.locality}
                  </p>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-1">
              <span className="text-xs font-medium font-poppins text-foreground block mb-1">
                Order Items ({items.length})
              </span>
              <div className="max-h-60 overflow-y-auto pr-1 divide-y divide-border/60">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Coupon Box */}
            <div className="pt-2 border-t border-border">
              <CouponBox itemTotal={itemTotal} />
            </div>

            {/* Bill Summary */}
            <div className="pt-2 border-t border-border">
              <span className="text-xs font-medium font-poppins text-foreground block mb-2">
                Bill Summary
              </span>
              <BillSummary bill={bill} />
            </div>

            {/* Place Order Button */}
            <div className="pt-2 space-y-2">
              <Button
                type="button"
                disabled={!canPlaceOrder}
                onClick={handlePlaceOrder}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-medium font-subheader text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {placeOrderMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  <span>Place order • {formatCurrency(bill.grandTotal)}</span>
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center font-subheader leading-tight">
                Cancellation policy: Orders cannot be cancelled once food preparation starts at the restaurant.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border p-3.5 shadow-2xl flex items-center justify-between gap-4">
        <div className="text-left">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-subheader">
            To Pay
          </span>
          <span className="text-lg font-medium font-poppins text-foreground">
            {formatCurrency(bill.grandTotal)}
          </span>
        </div>

        <Button
          type="button"
          disabled={!canPlaceOrder}
          onClick={handlePlaceOrder}
          className="flex-1 max-w-xs h-11 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-xs sm:text-sm shadow-md cursor-pointer"
        >
          {placeOrderMutation.isPending ? "Placing..." : "Place order"}
        </Button>
      </div>
    </PageLayout>
  )
}

export default CheckoutPage
