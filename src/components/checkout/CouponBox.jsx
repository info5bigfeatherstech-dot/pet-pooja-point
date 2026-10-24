// src/components/checkout/CouponBox.jsx - Coupon input, available chips, and application status
import React, { useState } from "react"
import { Tag, Check, X, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useValidateCoupon } from "@/hooks/useValidateCoupon"
import useCheckoutStore from "@/store/checkoutStore"
import { coupons as availableCoupons } from "@/data/coupons"

export function CouponBox({ itemTotal }) {
  const [inputCode, setInputCode] = useState("")
  const [inlineError, setInlineError] = useState("")
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon)
  const setCoupon = useCheckoutStore((state) => state.setCoupon)
  const removeCoupon = useCheckoutStore((state) => state.removeCoupon)

  const validateMutation = useValidateCoupon()

  const handleApply = async (codeToApply) => {
    const code = (codeToApply || inputCode).trim().toUpperCase()
    if (!code) {
      setInlineError("Please enter a coupon code.")
      return
    }

    setInlineError("")
    try {
      const valid = await validateMutation.mutateAsync({ code, itemTotal })
      setCoupon(valid)
      setInputCode("")
    } catch (err) {
      setInlineError(err.message || "Failed to apply coupon.")
    }
  }

  const handleRemove = () => {
    removeCoupon()
    setInlineError("")
  }

  return (
    <div className="space-y-3 text-left">
      {appliedCoupon ? (
        // Applied state banner
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium font-poppins text-emerald-800">
                "{appliedCoupon.code}" applied
              </p>
              <p className="text-[11px] text-emerald-700/80 font-subheader truncate">
                {appliedCoupon.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-xs font-medium text-destructive hover:underline px-2 py-1 shrink-0 cursor-pointer"
          >
            Remove
          </button>
        </div>
      ) : (
        // Input form
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Enter promo coupon code"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.toUpperCase())
                  setInlineError("")
                }}
                className="pl-9 rounded-xl font-subheader text-xs sm:text-sm uppercase tracking-wide"
              />
            </div>
            <Button
              type="button"
              disabled={validateMutation.isPending || !inputCode.trim()}
              onClick={() => handleApply(inputCode)}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-medium text-xs sm:text-sm px-4 h-10"
            >
              {validateMutation.isPending ? "Applying..." : "Apply"}
            </Button>
          </div>

          {inlineError && (
            <p className="text-xs font-medium text-destructive animate-in fade-in pl-1">
              {inlineError}
            </p>
          )}

          {/* Clickable Available Coupon Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] text-muted-foreground font-subheader flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              Available Offers:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableCoupons.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleApply(c.code)}
                  className="px-2.5 py-1 rounded-lg border border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 text-primary font-medium text-[11px] font-mono transition-colors cursor-pointer"
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CouponBox
