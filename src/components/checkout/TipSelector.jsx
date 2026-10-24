// src/components/checkout/TipSelector.jsx - Tip selector with chips and custom input
import React, { useState } from "react"
import { Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import useCheckoutStore from "@/store/checkoutStore"
import { cn } from "@/lib/utils"

const presetTips = [
  { label: "No tip", value: 0 },
  { label: "₹20", value: 20 },
  { label: "₹30", value: 30 },
  { label: "₹50", value: 50 },
]

export function TipSelector() {
  const currentTip = useCheckoutStore((state) => state.tip)
  const setTip = useCheckoutStore((state) => state.setTip)
  const [isCustom, setIsCustom] = useState(false)
  const [customValue, setCustomValue] = useState("")

  const handlePresetSelect = (val) => {
    setIsCustom(false)
    setCustomValue("")
    setTip(val)
  }

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, "")
    setCustomValue(val)
    setTip(Number(val) || 0)
  }

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 font-poppins">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          Tip your delivery partner
        </label>
        <span className="text-[11px] text-muted-foreground font-subheader">
          100% goes to your rider
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {presetTips.map((preset) => {
          const isSelected = !isCustom && currentTip === preset.value
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => handlePresetSelect(preset.value)}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs font-medium font-subheader transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              )}
            >
              {preset.label}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => setIsCustom(true)}
          className={cn(
            "px-3 py-1.5 rounded-xl border text-xs font-medium font-subheader transition-all cursor-pointer",
            isCustom
              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
              : "bg-background text-foreground border-border hover:border-primary/50"
          )}
        >
          Custom
        </button>
      </div>

      {isCustom && (
        <div className="pt-1 max-w-[160px] animate-in fade-in">
          <Input
            type="tel"
            inputMode="numeric"
            placeholder="Enter ₹ amount"
            value={customValue}
            onChange={handleCustomChange}
            className="h-8 text-xs font-subheader rounded-xl"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}

export default TipSelector
