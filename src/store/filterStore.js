// src/store/filterStore.js - Zustand client store for search & filter UI states
import { create } from "zustand"

const initialFilters = {
  activeEntry: "delivery", // 'delivery' | 'dining' | 'nightlife'
  search: "",
  rating4Plus: false,
  pureVeg: false,
  openNow: false,
  cuisine: "",
  sortBy: "rating", // 'rating' | 'priceAsc' | 'priceDesc' | 'distance'
}

export const useFilterStore = create((set) => ({
  ...initialFilters,

  setActiveEntry: (activeEntry) => set({ activeEntry }),
  setSearch: (search) => set({ search }),
  setRating4Plus: (rating4Plus) => set((state) => ({
    rating4Plus: typeof rating4Plus === "boolean" ? rating4Plus : !state.rating4Plus,
  })),
  setPureVeg: (pureVeg) => set((state) => ({
    pureVeg: typeof pureVeg === "boolean" ? pureVeg : !state.pureVeg,
  })),
  setOpenNow: (openNow) => set((state) => ({
    openNow: typeof openNow === "boolean" ? openNow : !state.openNow,
  })),
  setCuisine: (cuisine) => set({ cuisine }),
  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () =>
    set((state) => ({
      ...initialFilters,
      activeEntry: state.activeEntry, // Keep active entry context or reset everything except category
      search: "",
    })),

  resetAll: () => set(initialFilters),
}))

export default useFilterStore
