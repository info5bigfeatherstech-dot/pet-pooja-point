// src/utils/billCalculator.js - Single source of truth for all bill computations in Tablefy

export function calculateBill({ itemTotal = 0, coupon = null, tip = 0 }) {
  const safeItemTotal = Math.max(0, Number(itemTotal) || 0)
  const safeTip = Math.max(0, Number(tip) || 0)

  // Platform fee is fixed at ₹5
  const platformFee = safeItemTotal > 0 ? 5 : 0

  // 5% GST tax on item total
  const tax = safeItemTotal > 0 ? Math.round(safeItemTotal * 0.05) : 0

  // Delivery fee logic: Free on orders >= ₹399 or free_delivery coupon, otherwise ₹40
  let isFreeDeliveryCoupon = false
  let discount = 0

  if (coupon && safeItemTotal >= (coupon.minOrder || 0)) {
    if (coupon.type === "percent") {
      const calculated = (safeItemTotal * coupon.value) / 100
      discount = Math.round(coupon.maxDiscount ? Math.min(calculated, coupon.maxDiscount) : calculated)
    } else if (coupon.type === "flat") {
      discount = Math.min(coupon.value, safeItemTotal)
    } else if (coupon.type === "free_delivery") {
      isFreeDeliveryCoupon = true
    }
  }

  const deliveryFee = safeItemTotal >= 399 || isFreeDeliveryCoupon || safeItemTotal === 0 ? 0 : 40

  const grandTotal = Math.max(0, safeItemTotal + deliveryFee + platformFee + tax - discount + safeTip)

  return {
    itemTotal: safeItemTotal,
    deliveryFee,
    platformFee,
    tax,
    discount,
    tip: safeTip,
    grandTotal,
  }
}

export default calculateBill
