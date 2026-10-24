// src/store/cartStore.js - Zustand cart store persisted in localStorage with restaurant validation and seed data
import { create } from "zustand"
import { toast } from "sonner"

const STORAGE_KEY = "tablefy_cart_v2"

const seedRestaurant = {
  id: "rest-1",
  name: "The Imperial Spice",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  locality: "Connaught Place",
}

const seedItems = [
  { id: "seed-1", name: "Butter Chicken & Naan Meal", price: 380, qty: 1, isVeg: false },
  { id: "seed-2", name: "Dal Makhani Handi", price: 260, qty: 1, isVeg: true },
  { id: "seed-3", name: "Garlic Butter Naan", price: 65, qty: 2, isVeg: true },
]

const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        return {
          restaurant: parsed.restaurant || seedRestaurant,
          items: parsed.items,
        }
      }
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage", err)
  }
  // Default seeded cart so checkout works immediately
  return {
    restaurant: seedRestaurant,
    items: seedItems,
  }
}

const savePersistedState = (restaurant, items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ restaurant, items }))
  } catch (err) {
    console.error("Failed to save cart to localStorage", err)
  }
}

const initialData = loadPersistedState()

export const useCartStore = create((set, get) => ({
  restaurant: initialData.restaurant,
  items: initialData.items,

  isCartOpen: false,
  isCustomiseOpen: false,
  customiseProduct: null,

  // Replace cart dialog state for different restaurants
  isReplaceDialogOpen: false,
  pendingRestaurant: null,
  pendingItem: null,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openCustomise: (product) => set({ isCustomiseOpen: true, customiseProduct: product }),
  closeCustomise: () => set({ isCustomiseOpen: false, customiseProduct: null }),

  // Main addItem implementation complying with prompt
  addItem: (targetRestaurant, item) => {
    const state = get()
    const activeRest = state.restaurant
    const safeRest = targetRestaurant || seedRestaurant

    // If active cart has items and target restaurant is different, ask confirmation
    if (activeRest && activeRest.id !== safeRest.id && state.items.length > 0) {
      set({
        isReplaceDialogOpen: true,
        pendingRestaurant: safeRest,
        pendingItem: item,
      })
      return
    }

    const price = item.price || item.basePrice || 0
    const cleanItem = {
      id: item.id || `item-${Date.now()}`,
      name: item.name,
      price: price,
      qty: item.qty || 1,
      isVeg: item.isVeg ?? true,
    }

    const existingIndex = state.items.findIndex((i) => i.id === cleanItem.id)
    let newItems = []

    if (existingIndex > -1) {
      newItems = state.items.map((i, idx) =>
        idx === existingIndex ? { ...i, qty: i.qty + (cleanItem.qty || 1) } : i
      )
    } else {
      newItems = [...state.items, cleanItem]
    }

    savePersistedState(safeRest, newItems)
    set({
      restaurant: safeRest,
      items: newItems,
      isCustomiseOpen: false,
      customiseProduct: null,
    })
    toast.success(`${cleanItem.name} added to cart!`)
  },

  confirmReplaceCart: () => {
    const { pendingRestaurant, pendingItem } = get()
    if (!pendingItem) {
      set({ isReplaceDialogOpen: false, pendingRestaurant: null, pendingItem: null })
      return
    }

    const price = pendingItem.price || pendingItem.basePrice || 0
    const cleanItem = {
      id: pendingItem.id || `item-${Date.now()}`,
      name: pendingItem.name,
      price: price,
      qty: pendingItem.qty || 1,
      isVeg: pendingItem.isVeg ?? true,
    }

    const newItems = [cleanItem]
    savePersistedState(pendingRestaurant, newItems)
    set({
      restaurant: pendingRestaurant,
      items: newItems,
      isReplaceDialogOpen: false,
      pendingRestaurant: null,
      pendingItem: null,
      isCustomiseOpen: false,
      customiseProduct: null,
    })
    toast.success(`Cart updated with items from ${pendingRestaurant.name}`)
  },

  cancelReplaceCart: () => {
    set({
      isReplaceDialogOpen: false,
      pendingRestaurant: null,
      pendingItem: null,
    })
  },

  removeItem: (itemId) => {
    const state = get()
    const newItems = state.items.filter((i) => i.id !== itemId)
    const newRest = newItems.length === 0 ? null : state.restaurant
    savePersistedState(newRest, newItems)
    set({ items: newItems, restaurant: newRest })
  },

  increaseQty: (itemId) => {
    const state = get()
    const newItems = state.items.map((i) =>
      i.id === itemId ? { ...i, qty: i.qty + 1 } : i
    )
    savePersistedState(state.restaurant, newItems)
    set({ items: newItems })
  },

  decreaseQty: (itemId) => {
    const state = get()
    const target = state.items.find((i) => i.id === itemId)
    if (!target) return

    let newItems = []
    if (target.qty <= 1) {
      newItems = state.items.filter((i) => i.id !== itemId)
    } else {
      newItems = state.items.map((i) =>
        i.id === itemId ? { ...i, qty: i.qty - 1 } : i
      )
    }
    const newRest = newItems.length === 0 ? null : state.restaurant
    savePersistedState(newRest, newItems)
    set({ items: newItems, restaurant: newRest })
  },

  clearCart: () => {
    savePersistedState(null, [])
    set({ items: [], restaurant: null })
  },

  // Derived selectors
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + (item.qty || 0), 0)
  },

  getItemTotal: () => {
    return get().items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0)
  },
}))

export default useCartStore
