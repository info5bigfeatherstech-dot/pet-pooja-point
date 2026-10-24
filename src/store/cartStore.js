// src/store/cartStore.js - Robust Zustand cart store persisted in localStorage supporting all item additions, quantity management, restaurant checks, and seed data
import { create } from "zustand"

const STORAGE_KEY = "tablefy_cart_v2"

const seedRestaurant = {
  id: "rest-1",
  name: "The Imperial Spice",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  locality: "Connaught Place",
}

const seedItems = [
  {
    id: "seed-1",
    cartItemId: "seed-1",
    name: "Butter Chicken & Naan Meal",
    price: 380,
    qty: 1,
    quantity: 1,
    isVeg: false,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
    summaryText: "With 2 Butter Naan",
  },
  {
    id: "seed-2",
    cartItemId: "seed-2",
    name: "Dal Makhani Handi",
    price: 260,
    qty: 1,
    quantity: 1,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    summaryText: "Slow-cooked black lentils",
  },
  {
    id: "seed-3",
    cartItemId: "seed-3",
    name: "Garlic Butter Naan",
    price: 65,
    qty: 2,
    quantity: 2,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    summaryText: "Freshly baked in tandoor",
  },
]

// Normalizes items so neither qty nor quantity is ever undefined/NaN
const normalizeItems = (items) => {
  if (!Array.isArray(items)) return []
  return items.map((i, idx) => {
    const validQty =
      typeof i.qty === "number" && !isNaN(i.qty) && i.qty > 0
        ? i.qty
        : typeof i.quantity === "number" && !isNaN(i.quantity) && i.quantity > 0
        ? i.quantity
        : 1

    const validPrice =
      typeof i.price === "number" && !isNaN(i.price)
        ? i.price
        : typeof i.basePrice === "number" && !isNaN(i.basePrice)
        ? i.basePrice
        : 0

    const id = i.id || i.cartItemId || `item-${idx}-${Date.now()}`

    return {
      ...i,
      id,
      cartItemId: id,
      name: i.name || "Food Item",
      price: validPrice,
      qty: validQty,
      quantity: validQty,
      isVeg: i.isVeg ?? true,
      image: i.image || "",
      summaryText: i.summaryText || "",
    }
  })
}

const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        return {
          restaurant: parsed.restaurant || seedRestaurant,
          items: normalizeItems(parsed.items),
        }
      }
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage", err)
  }

  // Default seeded cart so checkout works immediately
  return {
    restaurant: seedRestaurant,
    items: normalizeItems(seedItems),
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

  // Toast state for CartToaster
  toast: null,
  showToast: (toastData) => set({ toast: toastData }),
  hideToast: () => set({ toast: null }),

  // Replace cart dialog state for different restaurants
  isReplaceDialogOpen: false,
  pendingRestaurant: null,
  pendingItem: null,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openCustomise: (product) => set({ isCustomiseOpen: true, customiseProduct: product }),
  closeCustomise: () => set({ isCustomiseOpen: false, customiseProduct: null }),

  /**
   * Universal addItem method supporting:
   * 1. addItem(restaurant, item) -> from Checkout, Reorder, Build Prompt
   * 2. addItem(product, selectedOptions, finalTotalPrice) -> from CustomiseItemModal
   * 3. addItem(item) -> direct item addition
   */
  addItem: (arg1, arg2, arg3) => {
    const state = get()

    let targetRestaurant = null
    let rawItem = null
    let summaryText = ""

    // Signature 2: CustomiseItemModal -> addItem(customiseProduct, allSelectedOptions, finalTotalPrice)
    if (arg1 && (Array.isArray(arg2) || typeof arg3 === "number")) {
      const product = arg1
      const selectedOptions = Array.isArray(arg2) ? arg2 : []
      const finalPrice =
        typeof arg3 === "number" && !isNaN(arg3)
          ? arg3
          : typeof product.basePrice === "number"
          ? product.basePrice
          : product.price || 0

      summaryText = selectedOptions.map((opt) => opt.name).join(", ")
      targetRestaurant = product.restaurant || state.restaurant || seedRestaurant

      rawItem = {
        id: selectedOptions.length > 0 ? `${product.id}-${Date.now()}` : product.id,
        name: product.name,
        price: finalPrice,
        qty: 1,
        quantity: 1,
        isVeg: product.isVeg ?? true,
        image: product.image || "",
        summaryText: summaryText,
        selectedOptions: selectedOptions,
      }
    }
    // Signature 1: addItem(restaurant, item)
    else if (arg1 && arg2 && typeof arg2 === "object") {
      targetRestaurant = arg1
      rawItem = arg2
    }
    // Signature 3: addItem(item)
    else if (arg1 && typeof arg1 === "object") {
      rawItem = arg1
      targetRestaurant = arg1.restaurant || state.restaurant || seedRestaurant
    }

    if (!rawItem) return

    const safeRest = targetRestaurant || state.restaurant || seedRestaurant

    // If active cart has items and target restaurant is different, ask confirmation
    if (state.restaurant && state.restaurant.id !== safeRest.id && state.items.length > 0) {
      set({
        isReplaceDialogOpen: true,
        pendingRestaurant: safeRest,
        pendingItem: rawItem,
      })
      return
    }

    const price =
      typeof rawItem.price === "number" && !isNaN(rawItem.price)
        ? rawItem.price
        : typeof rawItem.basePrice === "number" && !isNaN(rawItem.basePrice)
        ? rawItem.basePrice
        : 0

    const qty =
      typeof rawItem.qty === "number" && !isNaN(rawItem.qty) && rawItem.qty > 0
        ? rawItem.qty
        : typeof rawItem.quantity === "number" && !isNaN(rawItem.quantity) && rawItem.quantity > 0
        ? rawItem.quantity
        : 1

    const itemId = rawItem.id || rawItem.cartItemId || `item-${Date.now()}`

    const cleanItem = {
      id: itemId,
      cartItemId: itemId,
      name: rawItem.name || "Food Item",
      price: price,
      qty: qty,
      quantity: qty,
      isVeg: rawItem.isVeg ?? true,
      image: rawItem.image || "",
      summaryText: summaryText || rawItem.summaryText || "",
      selectedOptions: rawItem.selectedOptions || [],
    }

    const existingIndex = state.items.findIndex(
      (i) => i.id === cleanItem.id || i.cartItemId === cleanItem.cartItemId
    )

    let newItems = []
    if (existingIndex > -1) {
      newItems = state.items.map((i, idx) => {
        if (idx !== existingIndex) return i
        const updatedQty = (i.qty || i.quantity || 1) + cleanItem.qty
        return {
          ...i,
          qty: updatedQty,
          quantity: updatedQty,
        }
      })
    } else {
      newItems = [...state.items, cleanItem]
    }

    const normalized = normalizeItems(newItems)
    savePersistedState(safeRest, normalized)

    // Trigger CartToaster notification
    const toastData = {
      id: cleanItem.id,
      name: cleanItem.name,
      price: cleanItem.price,
      isVeg: cleanItem.isVeg,
      image: cleanItem.image || safeRest.image,
      summaryText: cleanItem.summaryText,
    }

    set({
      restaurant: safeRest,
      items: normalized,
      isCustomiseOpen: false,
      customiseProduct: null,
      toast: toastData,
    })
  },

  confirmReplaceCart: () => {
    const { pendingRestaurant, pendingItem } = get()
    if (!pendingItem) {
      set({ isReplaceDialogOpen: false, pendingRestaurant: null, pendingItem: null })
      return
    }

    const price =
      typeof pendingItem.price === "number" && !isNaN(pendingItem.price)
        ? pendingItem.price
        : pendingItem.basePrice || 0

    const qty =
      typeof pendingItem.qty === "number" && !isNaN(pendingItem.qty) && pendingItem.qty > 0
        ? pendingItem.qty
        : pendingItem.quantity || 1

    const itemId = pendingItem.id || pendingItem.cartItemId || `item-${Date.now()}`

    const cleanItem = {
      id: itemId,
      cartItemId: itemId,
      name: pendingItem.name || "Food Item",
      price: price,
      qty: qty,
      quantity: qty,
      isVeg: pendingItem.isVeg ?? true,
      image: pendingItem.image || "",
      summaryText: pendingItem.summaryText || "",
    }

    const newItems = normalizeItems([cleanItem])
    savePersistedState(pendingRestaurant, newItems)

    set({
      restaurant: pendingRestaurant,
      items: newItems,
      isReplaceDialogOpen: false,
      pendingRestaurant: null,
      pendingItem: null,
      isCustomiseOpen: false,
      customiseProduct: null,
      toast: {
        id: cleanItem.id,
        name: cleanItem.name,
        price: cleanItem.price,
        isVeg: cleanItem.isVeg,
        image: cleanItem.image || pendingRestaurant.image,
        summaryText: cleanItem.summaryText,
      },
    })
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
    const newItems = state.items.filter((i) => i.id !== itemId && i.cartItemId !== itemId)
    const newRest = newItems.length === 0 ? null : state.restaurant
    const normalized = normalizeItems(newItems)
    savePersistedState(newRest, normalized)
    set({ items: normalized, restaurant: newRest })
  },

  increaseQty: (itemId) => {
    const state = get()
    const newItems = state.items.map((i) => {
      if (i.id !== itemId && i.cartItemId !== itemId) return i
      const nextQty = (i.qty || i.quantity || 1) + 1
      return {
        ...i,
        qty: nextQty,
        quantity: nextQty,
      }
    })
    const normalized = normalizeItems(newItems)
    savePersistedState(state.restaurant, normalized)
    set({ items: normalized })
  },

  decreaseQty: (itemId) => {
    const state = get()
    const target = state.items.find((i) => i.id === itemId || i.cartItemId === itemId)
    if (!target) return

    const currentQty = target.qty || target.quantity || 1
    let newItems = []

    if (currentQty <= 1) {
      newItems = state.items.filter((i) => i.id !== itemId && i.cartItemId !== itemId)
    } else {
      newItems = state.items.map((i) => {
        if (i.id !== itemId && i.cartItemId !== itemId) return i
        const nextQty = currentQty - 1
        return {
          ...i,
          qty: nextQty,
          quantity: nextQty,
        }
      })
    }

    const newRest = newItems.length === 0 ? null : state.restaurant
    const normalized = normalizeItems(newItems)
    savePersistedState(newRest, normalized)
    set({ items: normalized, restaurant: newRest })
  },

  // Legacy alias for decreaseQty/increaseQty
  updateQuantity: (itemId, delta) => {
    if (delta > 0) {
      get().increaseQty(itemId)
    } else {
      get().decreaseQty(itemId)
    }
  },

  clearCart: () => {
    savePersistedState(null, [])
    set({ items: [], restaurant: null, toast: null })
  },

  // Derived selectors
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + (item.qty || item.quantity || 0), 0)
  },

  getItemTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.qty || item.quantity || 0),
      0
    )
  },
}))

export default useCartStore
