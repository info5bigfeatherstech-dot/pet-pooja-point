// src/components/auth/AuthModal.jsx - Zepto-inspired Login Popup for Indian Phone Numbers (+91)
import React, { useState, useEffect, useRef } from "react"
import { X, ChevronDown, CheckCircle2, Sparkles } from "lucide-react"
import useAuthStore from "@/store/authStore"

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore()

  // State: 'phone' | 'success'
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const phoneInputRef = useRef(null)

  // Reset state when modal opens or closes
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep("phone")
      setPhone("")
      setError("")
      setIsLoading(false)
      setTimeout(() => {
        phoneInputRef.current?.focus()
      }, 100)
    }
  }, [isAuthModalOpen])

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAuthModalOpen, closeAuthModal])

  if (!isAuthModalOpen) return null

  // Indian mobile number rules: 10 digits, starts with 6, 7, 8, or 9
  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, "") // numbers only
    if (rawVal.length <= 10) {
      setPhone(rawVal)
      setError("")
    }
  }

  const isPhoneValid = phone.length === 10 && /^[6-9]/.test(phone)

  // Direct login after phone number entered (no OTP / dummy login mode)
  const handleLoginSubmit = (e) => {
    e?.preventDefault()
    if (!isPhoneValid) {
      if (phone.length < 10) {
        setError("Please enter a valid 10-digit mobile number")
      } else if (!/^[6-9]/.test(phone)) {
        setError("Indian mobile numbers must start with 6, 7, 8, or 9")
      }
      return
    }

    setIsLoading(true)
    setError("")

    // Instant smooth login animation
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
      setTimeout(() => {
        login(phone)
      }, 700)
    }, 350)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal()
      }}
    >
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[820px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Left Side: Illustration & Branding Banner */}
        <div className="w-full md:w-[48%] bg-gradient-to-br from-[#FFF5EC] via-[#FFEADB] to-[#FFF0E2] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-orange-100/60">
          
          {/* Subtle decorative background circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 -right-16 w-52 h-52 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Logo & Tagline */}
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-poppins tracking-tight text-slate-900">
                Pet Pooja Point<span className="text-primary text-3xl leading-none">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary font-subheader">
                India
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900 leading-tight mt-3">
              Everything <br className="hidden sm:inline" />
              Delivered in <br />
              <span className="text-primary font-black drop-shadow-xs">minutes</span>
            </h2>

            <p className="text-xs text-slate-600 mt-2 font-subheader leading-relaxed">
              Reserve best tables, discover dining offers & order gourmet meals across India.
            </p>
          </div>

          {/* Center/Bottom Illustration Banner */}
          <div className="relative z-10 mt-4 sm:mt-6 rounded-2xl overflow-hidden shadow-sm border border-orange-200/60 bg-white/60">
            <img
              src="/auth-banner.jpg"
              alt="Pet Pooja Point quick food delivery and dining illustration"
              className="w-full h-44 sm:h-52 md:h-56 object-cover object-center transform hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2.5 text-center">
              <span className="text-white text-[11px] font-medium flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Lightning fast bookings & contactless dining
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-[52%] p-6 sm:p-8 flex flex-col justify-between bg-white relative overflow-y-auto">
          
          {/* Top Bar: Close Button */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Sign in to your account</span>

            <button
              type="button"
              onClick={closeAuthModal}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* STEP 1: Indian Phone Number Input */}
          {step === "phone" && (
            <div className="my-auto py-4 space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900">
                  Groceries & dining in <br />
                  <span className="text-primary font-black">minutes</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your 10-digit Indian mobile number to continue
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div
                  className={`border-2 rounded-2xl flex items-center px-3.5 py-2.5 transition-all bg-white ${
                    error
                      ? "border-red-400 focus-within:border-red-500 ring-2 ring-red-100"
                      : "border-slate-300 focus-within:border-slate-900 hover:border-slate-400"
                  }`}
                >
                  {/* Country Prefix Fixed for India */}
                  <div className="flex items-center gap-1.5 shrink-0 pr-2.5 border-r border-slate-200 select-none">
                    <span className="text-lg leading-none" role="img" aria-label="India Flag">
                      🇮🇳
                    </span>
                    <span className="text-sm font-semibold text-slate-800 font-subheader">
                      +91
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Phone input */}
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter Phone Number"
                    className="w-full pl-3 pr-1 py-1 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-hidden font-subheader bg-transparent tracking-wide"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 font-medium pl-1 animate-in fade-in">
                    {error}
                  </p>
                )}

                {/* Continue / Login Button */}
                <button
                  type="submit"
                  disabled={!isPhoneValid || isLoading}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isPhoneValid && !isLoading
                      ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99]"
                      : "bg-[#EBEFF5] text-[#8E9CAE] cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              {/* Terms & Privacy */}
              <p className="text-[11px] text-slate-500 text-center leading-relaxed font-subheader">
                By continuing, you agree to our{" "}
                <a href="#terms" className="text-primary hover:underline font-medium">
                  Terms of Use
                </a>{" "}
                &{" "}
                <a href="#privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}

          {/* STEP 2: Instant Success Screen */}
          {step === "success" && (
            <div className="my-auto py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-slate-900">
                Logged in successfully!
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Welcome to Pet Pooja Point (+91 {phone.slice(0, 5)} {phone.slice(5)})
              </p>
            </div>
          )}



        </div>

      </div>
    </div>
  )
}

export default AuthModal
