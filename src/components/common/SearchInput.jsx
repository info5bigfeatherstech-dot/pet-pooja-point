// src/components/common/SearchInput.jsx - Debounced search bar with Lucide icon and clear action
import React, { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import useFilterStore from "@/store/filterStore"
import { cn } from "@/lib/utils"

export function SearchInput({
  placeholder = "Search for restaurant, cuisine, or dish...",
  className = "",
  inputClassName = "",
  autoFocus = false,
}) {
  const searchStore = useFilterStore((state) => state.search)
  const setSearchStore = useFilterStore((state) => state.setSearch)
  const [localQuery, setLocalQuery] = useState(searchStore)

  // Sync from store if reset externally
  useEffect(() => {
    setLocalQuery(searchStore)
  }, [searchStore])

  // Debounce 400ms before writing into Zustand store
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchStore) {
        setSearchStore(localQuery)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [localQuery, searchStore, setSearchStore])

  const handleClear = () => {
    setLocalQuery("")
    setSearchStore("")
  }

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "w-full pl-10 pr-9 h-11 rounded-full bg-card border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-primary focus-visible:border-primary transition duration-200",
          inputClassName
        )}
      />
      {localQuery && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchInput
