// src/components/layout/MobileMenu.jsx - Responsive drawer navigation using shadcn Sheet
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Menu,
  Utensils,
  Compass,
  ShieldCheck,
  ShoppingBag,
  User,
  MapPin,
  LogOut,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import CitySelect from "../common/CitySelect"
import SearchInput from "../common/SearchInput"
import useAuthStore from "@/store/authStore"
import useCartStore from "@/store/cartStore"

export function MobileMenu({ isOpen, onOpenChange }) {
  const navigate = useNavigate()
  const { isLoggedIn, user, openAuthModal, logout } = useAuthStore()

  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + (item.qty || item.quantity || 1), 0)
  )

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U"

  const handleNav = (path) => {
    onOpenChange(false)
    navigate(path)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open menu"
          className="md:hidden rounded-full border-white/60 bg-white/20 text-white hover:bg-white/30"
        >
          <Menu className="w-5 h-5 text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[85%] max-w-sm bg-surface border-[#245057] text-[#F3EFE6] p-6 flex flex-col justify-between overflow-y-auto"
      >
        <div className="space-y-6">
          <SheetHeader className="text-left space-y-1">
            <SheetTitle className="text-2xl font-medium font-poppins tracking-tight text-[#F3EFE6] flex items-center">
              Tablefy<span className="text-primary text-3xl leading-none">.</span>
            </SheetTitle>
            <p className="text-xs text-[#9DB5B8]">
              Discover top restaurants & dining spots
            </p>
          </SheetHeader>

          {/* Location Picker */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#9DB5B8] uppercase tracking-wider">
              Your City
            </label>
            <CitySelect className="w-full justify-between bg-[#16393F] text-[#F3EFE6] border-[#245057]" />
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#9DB5B8] uppercase tracking-wider">
              Search Food & Places
            </label>
            <SearchInput
              autoFocus={false}
              inputClassName="bg-[#16393F] border-[#245057] text-[#F3EFE6] placeholder:text-[#9DB5B8]"
            />
          </div>

          <Separator className="bg-[#245057]" />

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 text-sm">
            <button
              onClick={() => handleNav("/checkout")}
              className="flex items-center justify-between py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors text-left font-medium"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span>My Cart & Checkout</span>
              </div>
              {cartCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </button>

            {isLoggedIn && (
              <>
                <button
                  onClick={() => handleNav("/profile/details")}
                  className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors text-left font-medium"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Profile Details</span>
                </button>
                <button
                  onClick={() => handleNav("/profile/orders")}
                  className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors text-left font-medium"
                >
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => handleNav("/profile/addresses")}
                  className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors text-left font-medium"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Saved Addresses</span>
                </button>
              </>
            )}

            <a
              href="/#explore"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors font-medium"
            >
              <Utensils className="w-4 h-4 text-primary" />
              <span>Explore Restaurants</span>
            </a>
            <a
              href="/#collections"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors font-medium"
            >
              <Compass className="w-4 h-4 text-primary" />
              <span>Curated Collections</span>
            </a>
            <a
              href="/#localities"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Popular Localities</span>
            </a>
          </nav>
        </div>

        {/* User Auth Buttons */}
        <div className="pt-6 border-t border-[#245057] space-y-3">
          {isLoggedIn && user ? (
            <div className="space-y-3">
              <div className="p-3 bg-[#16393F] border border-[#245057] rounded-xl flex items-center gap-3">
                <Avatar className="w-9 h-9 border border-white/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-slate-900 text-white text-xs font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#9DB5B8]">Logged in as</p>
                  <p className="text-sm font-medium text-[#F3EFE6] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#9DB5B8] truncate">
                    +91 {user.phone}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-200 font-medium"
                onClick={() => {
                  logout()
                  onOpenChange(false)
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full rounded-full border-[#245057] bg-[#16393F] hover:border-primary text-[#F3EFE6] font-medium"
                onClick={() => {
                  onOpenChange(false)
                  openAuthModal()
                }}
              >
                Log in
              </Button>
              <Button
                className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
                onClick={() => {
                  onOpenChange(false)
                  openAuthModal()
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
