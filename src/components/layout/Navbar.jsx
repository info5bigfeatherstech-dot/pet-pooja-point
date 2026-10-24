// src/components/layout/Navbar.jsx - Sticky navigation bar flush with the top with orange background from logo to sign up
import React, { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Container from "./Container"
import CitySelect from "../common/CitySelect"
import SearchInput from "../common/SearchInput"
import MobileMenu from "./MobileMenu"
import useAuthStore from "@/store/authStore"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false)
  const { openAuthModal, user, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-50 w-full">
      <Container>
        {/* Orange background bar touching the top edge (zero gap) with rounded bottom corners */}
        <div className="w-full bg-primary text-white rounded-b-2xl md:rounded-b-3xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 shadow-md">
          {/* Left: Brand Logo & City Picker */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <a
              href="/"
              className="text-2xl font-medium font-poppins tracking-tight text-white hover:opacity-95 transition-opacity flex items-center select-none drop-shadow-xs"
            >
              <span>Tablefy</span>
              <span className="text-slate-950 text-3xl leading-none">.</span>
            </a>

            <div className="hidden sm:block">
              <CitySelect className="bg-white/95 text-slate-800 border-white/80 hover:border-white shadow-xs font-subheader h-9 sm:h-10 text-xs sm:text-sm" />
            </div>
          </div>

          {/* Center: Search Bar (Desktop / Tablet) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-4">
            <SearchInput
              placeholder="Search for restaurant, cuisine or a dish..."
              inputClassName="bg-white border-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-900 shadow-xs font-subheader h-10 text-sm"
            />
          </div>

          {/* Right: Actions / Auth Buttons (Desktop) & Mobile triggers */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mobile search toggle icon */}
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle mobile search"
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
              className="md:hidden rounded-full border-white/60 bg-white/20 text-white hover:bg-white/30 w-8 h-8 sm:w-9 sm:h-9"
            >
              {mobileSearchVisible ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Search className="w-4 h-4 text-white" />
              )}
            </Button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              {user ? (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs pl-3 pr-1.5 py-1 rounded-full border border-white/40">
                  <span className="text-xs font-semibold text-white font-subheader">
                    +91 {user.phone.slice(0, 5)} {user.phone.slice(5)}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={logout}
                    className="h-7 px-2.5 text-xs text-white hover:bg-white/20 rounded-full font-medium"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={openAuthModal}
                    className="rounded-full border-white/80 bg-white/10 hover:bg-white/25 text-white text-xs sm:text-sm font-medium font-subheader px-4 h-9 shadow-2xs cursor-pointer"
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={openAuthModal}
                    className="rounded-full bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-semibold font-subheader px-4 h-9 shadow-md transition-all cursor-pointer"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Sheet Trigger */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            />
          </div>
        </div>

        {/* Expandable Mobile Search Bar (nested in container) */}
        {mobileSearchVisible && (
          <div className="md:hidden mt-2 bg-primary rounded-2xl p-2.5 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
            <SearchInput
              autoFocus={true}
              placeholder="Search restaurants, cuisines..."
              inputClassName="bg-white border-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-900 shadow-xs font-subheader h-9 text-xs"
            />
          </div>
        )}
      </Container>
    </header>
  )
}

export default Navbar
