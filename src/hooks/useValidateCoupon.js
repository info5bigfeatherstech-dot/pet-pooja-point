// src/hooks/useValidateCoupon.js - TanStack Query hook and mutation for coupon validation
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { validateCoupon } from "@/api/couponApi"

export function useValidateCoupon() {
  return useMutation({
    mutationFn: ({ code, itemTotal }) => validateCoupon(code, itemTotal),
    onSuccess: (coupon) => {
      toast.success(`Coupon "${coupon.code}" applied!`)
    },
    onError: (err) => {
      toast.error(err.message || "Invalid coupon.")
    },
  })
}

export default useValidateCoupon
