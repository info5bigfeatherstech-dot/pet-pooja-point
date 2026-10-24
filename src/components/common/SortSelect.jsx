// src/components/common/SortSelect.jsx - Reusable dropdown selector using shadcn Select
import React from "react"
import { ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function SortSelect({
  value,
  onValueChange,
  placeholder = "Sort by",
  options = [
    { value: "rating", label: "Rating: High to Low" },
    { value: "priceAsc", label: "Cost: Low to High" },
    { value: "priceDesc", label: "Cost: High to Low" },
    { value: "distance", label: "Distance: Nearest First" },
  ],
  icon: Icon = ArrowUpDown,
  className = "",
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-10 px-4 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:border-primary focus:ring-primary focus:ring-2 transition duration-200 cursor-pointer w-auto min-w-[150px] gap-2",
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-popover border-border text-foreground rounded-xl shadow-xl z-50">
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer text-sm rounded-lg focus:bg-secondary focus:text-foreground"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelect
