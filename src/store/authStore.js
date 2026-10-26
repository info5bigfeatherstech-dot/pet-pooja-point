// src/store/authStore.js - Zustand auth store managing user login state with dummy user support
import { create } from "zustand"
import { toast } from "sonner"
import { dummyUser } from "@/data/user"

export const useAuthStore = create((set) => ({
  isLoggedIn: true,
  user: dummyUser,
  isAuthModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  login: (phone) => {
    set({
      isLoggedIn: true,
      user: { ...dummyUser, phone: phone || dummyUser.phone },
      isAuthModalOpen: false,
    })
    toast.success("Welcome back to Pet Pooja Point!")
  },

  logout: () => {
    set({ isLoggedIn: false, user: null })
    toast("Logged out successfully.", {
      description: "You have been logged out of Pet Pooja Point.",
    })
  },
}))

export default useAuthStore
