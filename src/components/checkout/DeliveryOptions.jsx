// src/components/checkout/DeliveryOptions.jsx - Delivery timing, instructions, contactless toggle, and tip
import React from "react"
import { Clock, ShieldCheck, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import TipSelector from "./TipSelector"
import useCheckoutStore from "@/store/checkoutStore"

export function DeliveryOptions() {
  const instructions = useCheckoutStore((state) => state.instructions)
  const setInstructions = useCheckoutStore((state) => state.setInstructions)
  const contactless = useCheckoutStore((state) => state.contactless)
  const setContactless = useCheckoutStore((state) => state.setContactless)

  return (
    <div className="space-y-5 text-left">
      {/* Estimated Delivery Time Banner */}
      <div className="p-3.5 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium font-poppins text-foreground">
              Estimated Delivery Time
            </p>
            <p className="text-[11px] text-muted-foreground font-subheader">
              Prepared fresh and dispatched on priority
            </p>
          </div>
        </div>
        <span className="text-xs sm:text-sm font-medium font-poppins text-primary bg-primary/10 px-2.5 py-1 rounded-xl">
          30-35 mins
        </span>
      </div>

      {/* Delivery Instructions */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="instructions-field"
            className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 font-poppins"
          >
            <MessageSquare className="w-3.5 h-3.5 text-primary" />
            Delivery Instructions
          </Label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {instructions.length}/150
          </span>
        </div>
        <Textarea
          id="instructions-field"
          placeholder="e.g. Ring the bell twice, don't ring after 10 PM, leave with security..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          maxLength={150}
          className="resize-none rounded-xl text-xs font-subheader"
          rows={3}
        />
      </div>

      {/* Contactless Delivery Switch */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border">
        <div className="space-y-0.5 pr-2">
          <Label
            htmlFor="contactless-switch"
            className="text-xs sm:text-sm font-medium text-foreground cursor-pointer flex items-center gap-1.5 font-poppins"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Contactless Delivery
          </Label>
          <p className="text-[11px] text-muted-foreground font-subheader">
            Our delivery partner will leave your food at the door and notify you.
          </p>
        </div>
        <Switch
          id="contactless-switch"
          checked={contactless}
          onCheckedChange={setContactless}
        />
      </div>

      {/* Tip Selector */}
      <div className="pt-2 border-t border-border/70">
        <TipSelector />
      </div>
    </div>
  )
}

export default DeliveryOptions
