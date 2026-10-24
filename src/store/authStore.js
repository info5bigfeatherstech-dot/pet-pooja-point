import { create } from "zustand"

export const useAuthStore = create((set) => ({
  isAuthModalOpen: false,
  user: null, // { phone: string }
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  login: (phone) => set({ user: { phone }, isAuthModalOpen: false }),
  logout: () => set({ user: null }),
}))

export default useAuthStore
