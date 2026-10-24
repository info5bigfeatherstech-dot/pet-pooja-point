// src/store/checkoutStore.js - Zustand store for checkout delivery preferences, payment & coupon (not persisted)
import { create } from "zustand"

const initialState = {
  selectedAddressId: "addr-1",
  paymentMethod: "upi", // 'upi' | 'card' | 'cod'
  tip: 0,
  instructions: "",
  contactless: false,
  couponCode: "",
  appliedCoupon: null,
}

export const useCheckoutStore = create((set) => ({
  ...initialState,

  setSelectedAddressId: (id) => set({ selectedAddressId: id }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setTip: (tipAmount) => set({ tip: Math.max(0, Number(tipAmount) || 0) }),
  setInstructions: (instructions) => set({ instructions: instructions.slice(0, 150) }),
  setContactless: (contactless) => set({ contactless }),
  setCoupon: (coupon) => set({ appliedCoupon: coupon, couponCode: coupon ? coupon.code : "" }),
  removeCoupon: () => set({ appliedCoupon: null, couponCode: "" }),
  reset: () => set(initialState),
}))

export default useCheckoutStore
