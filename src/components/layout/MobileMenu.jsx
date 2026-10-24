// src/components/layout/MobileMenu.jsx - Responsive drawer navigation using shadcn Sheet
import React from "react"
import { Menu, Utensils, Compass, ShieldCheck } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CitySelect from "../common/CitySelect"
import SearchInput from "../common/SearchInput"
import useAuthStore from "@/store/authStore"

export function MobileMenu({ isOpen, onOpenChange }) {
  const { user, openAuthModal, logout } = useAuthStore()

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
            <label className="text-xs font-semibold text-[#9DB5B8] uppercase tracking-wider">
              Your City
            </label>
            <CitySelect className="w-full justify-between bg-[#16393F] text-[#F3EFE6] border-[#245057]" />
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#9DB5B8] uppercase tracking-wider">
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
            <a
              href="#explore"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors"
            >
              <Utensils className="w-4 h-4 text-primary" />
              <span>Explore Restaurants</span>
            </a>
            <a
              href="#collections"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors"
            >
              <Compass className="w-4 h-4 text-primary" />
              <span>Curated Collections</span>
            </a>
            <a
              href="#localities"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 py-2 text-[#F3EFE6]/90 hover:text-primary transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Popular Localities</span>
            </a>
          </nav>
        </div>

        {/* User Auth Buttons */}
        <div className="pt-6 border-t border-[#245057] space-y-3">
          {user ? (
            <div className="space-y-2">
              <div className="p-3 bg-[#16393F] border border-[#245057] rounded-xl text-center">
                <p className="text-xs text-[#9DB5B8]">Logged in as</p>
                <p className="text-sm font-semibold text-[#F3EFE6] mt-0.5">
                  +91 {user.phone.slice(0, 5)} {user.phone.slice(5)}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-full border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-200"
                onClick={() => {
                  logout()
                  onOpenChange(false)
                }}
              >
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full rounded-full border-[#245057] bg-[#16393F] hover:border-primary text-[#F3EFE6]"
                onClick={() => {
                  onOpenChange(false)
                  openAuthModal()
                }}
              >
                Log in
              </Button>
              <Button
                className="w-full rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
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
