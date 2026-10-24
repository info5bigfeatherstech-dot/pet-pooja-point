// src/components/food/CustomiseItemModal.jsx - Customisation popup exactly matching the user's reference image
import React, { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import useCartStore from "@/store/cartStore"
import DietaryBadge from "../common/DietaryBadge"

export function CustomiseItemModal() {
  const { isCustomiseOpen, customiseProduct, closeCustomise, addItem } = useCartStore()

  // Selected options state: key is group id, value is array of option objects
  const [selections, setSelections] = useState({})

  // Initialize defaults whenever modal opens or product changes
  useEffect(() => {
    if (isCustomiseOpen && customiseProduct) {
      const initial = {}
      ;(customiseProduct.customizationGroups || []).forEach((group) => {
        if (group.type === "radio") {
          const defaultOpt = group.options.find((o) => o.isDefault) || group.options[0]
          initial[group.id] = defaultOpt ? [defaultOpt] : []
        } else {
          // Checkboxes start with defaults if any
          const defaults = group.options.filter((o) => o.isDefault)
          initial[group.id] = defaults
        }
      })
      setSelections(initial)
    }
  }, [isCustomiseOpen, customiseProduct])

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCustomiseOpen) {
        closeCustomise()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCustomiseOpen, closeCustomise])

  if (!isCustomiseOpen || !customiseProduct) return null

  const groups = customiseProduct.customizationGroups || []

  // Handle Radio selection
  const handleRadioSelect = (group, option) => {
    setSelections((prev) => ({
      ...prev,
      [group.id]: [option],
    }))
  }

  // Handle Checkbox selection
  const handleCheckboxToggle = (group, option) => {
    const currentList = selections[group.id] || []
    const isSelected = currentList.some((o) => o.id === option.id)

    if (isSelected) {
      // Remove
      setSelections((prev) => ({
        ...prev,
        [group.id]: currentList.filter((o) => o.id !== option.id),
      }))
    } else {
      // Check max limit
      if (group.max && currentList.length >= group.max) {
        return // Can't add more than max
      }
      setSelections((prev) => ({
        ...prev,
        [group.id]: [...currentList, option],
      }))
    }
  }

  // Calculate live dynamic total
  const basePrice = customiseProduct.basePrice || customiseProduct.price || 0
  let extraTotal = 0
  const allSelectedOptions = []

  Object.values(selections).forEach((optList) => {
    optList.forEach((opt) => {
      extraTotal += opt.price || 0
      allSelectedOptions.push(opt)
    })
  })

  const finalTotalPrice = basePrice + extraTotal

  const handleAddToCart = () => {
    addItem(customiseProduct, allSelectedOptions, finalTotalPrice)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCustomise()
      }}
    >
      {/* Modal Card */}
      <div className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-slate-100 flex items-start justify-between gap-3 bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 font-subheader">
              <span>{customiseProduct.name}</span>
              <span>•</span>
              <span className="font-semibold text-slate-800">₹{basePrice}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-medium font-poppins text-slate-900 tracking-tight mt-0.5">
              Customise as per your taste
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCustomise}
            aria-label="Close customisation modal"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Customisation Groups */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-6 bg-slate-50/50">
          {groups.map((group) => {
            const currentSelected = selections[group.id] || []
            const selectedCount = currentSelected.length
            const isSingleChoice = group.type === "radio"

            return (
              <div key={group.id} className="space-y-2.5">
                {/* Group Heading */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-slate-900 font-poppins">
                    {group.name} {group.instruction && `( ${group.instruction} )`}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    ({selectedCount}/{group.max || 1})
                  </span>
                </div>

                {/* Options Box Container */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
                  {group.options.map((option) => {
                    const isSelected = currentSelected.some((o) => o.id === option.id)

                    return (
                      <div
                        key={option.id}
                        onClick={() =>
                          isSingleChoice
                            ? handleRadioSelect(group, option)
                            : handleCheckboxToggle(group, option)
                        }
                        className={`px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer transition-colors select-none ${
                          isSelected ? "bg-emerald-50/40" : "hover:bg-slate-50"
                        }`}
                      >
                        {/* Left: Veg/Non-Veg icon & Name */}
                        <div className="flex items-center gap-3 min-w-0">
                          <DietaryBadge isVeg={option.isVeg ?? true} size="sm" />
                          <span
                            className={`text-xs sm:text-sm font-medium font-subheader truncate ${
                              isSelected ? "text-slate-900 font-semibold" : "text-slate-700"
                            }`}
                          >
                            {option.name}
                          </span>
                        </div>

                        {/* Right: Price Tag & Selector */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs sm:text-sm font-semibold text-slate-600 font-subheader">
                            {option.price > 0
                              ? `+ ₹${option.price}`
                              : option.price < 0
                              ? `- ₹${Math.abs(option.price)}`
                              : ""}
                          </span>

                          {/* Radio Button */}
                          {isSingleChoice ? (
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-emerald-600 bg-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-in zoom-in-75 duration-150" />
                              )}
                            </div>
                          ) : (
                            /* Checkbox */
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sticky Bottom Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-between gap-4 sticky bottom-0 z-10 shadow-lg">
          <div>
            <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider font-subheader">
              Total Amount
            </span>
            <span className="text-xl sm:text-2xl font-medium font-poppins text-slate-900">
              ₹{finalTotalPrice.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 max-w-[280px] bg-[#0FA958] hover:bg-[#0c904a] active:scale-[0.98] text-white font-medium font-subheader text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-center cursor-pointer"
          >
            Add Item to cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default CustomiseItemModal
