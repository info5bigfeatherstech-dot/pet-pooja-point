// src/store/locationStore.js - Zustand client store for selected city
import { create } from "zustand"

export const useLocationStore = create((set) => ({
  city: "Delhi NCR",
  setCity: (city) => set({ city }),
}))

export default useLocationStore
