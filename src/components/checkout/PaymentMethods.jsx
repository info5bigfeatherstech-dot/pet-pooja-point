// src/components/checkout/PaymentMethods.jsx - Payment method selection with simulated UPI, Card, and COD fields
import React, { useState } from "react"
import { QrCode, CreditCard, Banknote, ShieldCheck } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import useCheckoutStore from "@/store/checkoutStore"
import { cn } from "@/lib/utils"

export function PaymentMethods() {
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod)
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod)

  // Dummy input states for UI simulation
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  return (
    <div className="space-y-4 text-left">
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="space-y-3"
      >
        {/* Option 1: UPI */}
        <div
          onClick={() => setPaymentMethod("upi")}
          className={cn(
            "p-4 rounded-2xl border transition-all cursor-pointer",
            paymentMethod === "upi"
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-border/80"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <Label className="font-medium text-xs sm:text-sm cursor-pointer text-foreground font-poppins">
                  UPI / Google Pay / PhonePe / Paytm
                </Label>
                <p className="text-[11px] text-muted-foreground font-subheader">
                  Pay instantly via any UPI app or QR code
                </p>
              </div>
            </div>
            <RadioGroupItem value="upi" id="pay-upi" />
          </div>

          {paymentMethod === "upi" && (
            <div className="mt-3 pt-3 border-t border-border/60 max-w-sm animate-in fade-in space-y-1.5">
              <Label className="text-[11px] text-muted-foreground font-medium">
                Enter your VPA / UPI ID
              </Label>
              <Input
                placeholder="e.g. yourname@okhdfcbank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="h-9 text-xs font-subheader rounded-xl"
              />
            </div>
          )}
        </div>

        {/* Option 2: Credit / Debit Card */}
        <div
          onClick={() => setPaymentMethod("card")}
          className={cn(
            "p-4 rounded-2xl border transition-all cursor-pointer",
            paymentMethod === "card"
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-border/80"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <Label className="font-medium text-xs sm:text-sm cursor-pointer text-foreground font-poppins">
                  Credit or Debit Card
                </Label>
                <p className="text-[11px] text-muted-foreground font-subheader">
                  Visa, Mastercard, RuPay & American Express
                </p>
              </div>
            </div>
            <RadioGroupItem value="card" id="pay-card" />
          </div>

          {paymentMethod === "card" && (
            <div className="mt-3 pt-3 border-t border-border/60 space-y-2.5 max-w-sm animate-in fade-in">
              <Input
                placeholder="Card Number (4XXX XXXX XXXX XXXX)"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="h-9 text-xs font-subheader rounded-xl"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="h-9 text-xs font-subheader rounded-xl"
                />
                <Input
                  type="password"
                  placeholder="CVV"
                  maxLength={4}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="h-9 text-xs font-subheader rounded-xl"
                />
              </div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-subheader">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Cards are securely processed via 256-bit encryption.
              </p>
            </div>
          )}
        </div>

        {/* Option 3: Cash on Delivery */}
        <div
          onClick={() => setPaymentMethod("cod")}
          className={cn(
            "p-4 rounded-2xl border transition-all cursor-pointer",
            paymentMethod === "cod"
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-border/80"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <Label className="font-medium text-xs sm:text-sm cursor-pointer text-foreground font-poppins">
                  Cash on Delivery (COD)
                </Label>
                <p className="text-[11px] text-muted-foreground font-subheader">
                  Pay via Cash or UPI QR upon food delivery
                </p>
              </div>
            </div>
            <RadioGroupItem value="cod" id="pay-cod" />
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

export default PaymentMethods
