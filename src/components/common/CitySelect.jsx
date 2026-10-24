// src/components/common/CitySelect.jsx - City picker dropdown using shadcn DropdownMenu
import React from "react"
import { MapPin, ChevronDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useLocationStore from "@/store/locationStore"
import { cn } from "@/lib/utils"

const AVAILABLE_CITIES = [
  "Delhi NCR",
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Kolkata",
  "Chennai",
  "Pune",
  "Goa",
]

export function CitySelect({ className = "" }) {
  const city = useLocationStore((state) => state.city)
  const setCity = useLocationStore((state) => state.setCity)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-2 h-11 px-4 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition duration-200 select-none cursor-pointer shrink-0",
          className
        )}
      >
        <MapPin className="w-4 h-4 text-primary shrink-0" />
        <span className="truncate max-w-[110px] md:max-w-[130px]">{city}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-48 bg-popover border-border text-foreground rounded-xl shadow-xl z-50 p-1"
      >
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
          Select Location
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        {AVAILABLE_CITIES.map((c) => (
          <DropdownMenuItem
            key={c}
            onClick={() => setCity(c)}
            className={cn(
              "flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-secondary/70 focus:bg-secondary/70 focus:text-foreground",
              city === c && "text-primary font-semibold"
            )}
          >
            <span>{c}</span>
            {city === c && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CitySelect
