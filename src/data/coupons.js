// src/data/coupons.js - Active coupons data matching the Coupon data contract
export const coupons = [
  {
    code: "WELCOME50",
    description: "50% OFF up to ₹100 on orders above ₹199",
    type: "percent",
    value: 50,
    maxDiscount: 100,
    minOrder: 199,
  },
  {
    code: "FLAT75",
    description: "Flat ₹75 OFF on orders above ₹399",
    type: "flat",
    value: 75,
    maxDiscount: 75,
    minOrder: 399,
  },
  {
    code: "FREEDEL",
    description: "Free Delivery on orders above ₹249",
    type: "free_delivery",
    value: 40,
    maxDiscount: 40,
    minOrder: 249,
  },
]

export default coupons
