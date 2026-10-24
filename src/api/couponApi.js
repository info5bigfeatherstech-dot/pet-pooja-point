// src/api/couponApi.js - Coupon validation API service with in-memory validation and simulated delay
import { axiosInstance } from "./axiosInstance"
import { coupons } from "@/data/coupons"

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const validateCoupon = async (code, itemTotal = 0) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.post('/coupons/validate', { code, itemTotal })
  // return response.data

  const cleanCode = (code || "").trim().toUpperCase()
  const found = coupons.find((c) => c.code === cleanCode)

  if (!found) {
    throw new Error("Invalid coupon code. Please check and try again.")
  }

  if (itemTotal < (found.minOrder || 0)) {
    throw new Error(`Minimum order of ₹${found.minOrder} required to apply this coupon.`)
  }

  return { ...found }
}

export const getAvailableCoupons = async () => {
  await delay(300)
  return [...coupons]
}

export default {
  validateCoupon,
  getAvailableCoupons,
}
