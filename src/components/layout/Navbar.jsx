// src/components/layout/Navbar.jsx - Main navigation bar with Cart button and user avatar dropdown menu
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, X, ShoppingBag, User, MapPin, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Container from "./Container"
import CitySelect from "../common/CitySelect"
import SearchInput from "../common/SearchInput"
import MobileMenu from "./MobileMenu"
import useAuthStore from "@/store/authStore"
import useCartStore from "@/store/cartStore"

export function Navbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false)
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

  return (
    <header className="sticky top-0 z-50 w-full">
      <Container>
        {/* Orange background bar touching top edge with rounded bottom corners */}
        <div className="w-full bg-primary text-white rounded-b-2xl md:rounded-b-3xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 shadow-md">
          {/* Left: Brand Logo & City Picker */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0">
            <Link
              to="/"
              className="text-2xl font-medium font-poppins tracking-tight text-white hover:opacity-95 transition-opacity flex items-center select-none drop-shadow-xs"
            >
              <span>Tablefy</span>
              <span className="text-slate-950 text-3xl leading-none">.</span>
            </Link>

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

          {/* Right: Actions / Cart / Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Cart Button linking to /checkout */}
            <Button
              asChild
              variant="outline"
              size="icon"
              aria-label="View Cart and Checkout"
              className="relative rounded-full border-white/60 bg-white/20 text-white hover:bg-white/30 w-8 h-8 sm:w-9 sm:h-9 cursor-pointer"
            >
              <Link to="/checkout">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-slate-950 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center font-mono shadow-xs border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

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

            {/* Desktop Auth / Avatar Menu */}
            <div className="hidden md:flex items-center gap-2.5">
              {isLoggedIn && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="User Account Menu"
                    >
                      <Avatar className="w-7 h-7 border border-white/60">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-slate-900 text-white text-[11px] font-medium">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-white max-w-[100px] truncate">
                        {user.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-card border-border shadow-lg rounded-xl p-1.5 text-foreground"
                  >
                    <DropdownMenuLabel className="font-normal px-2 py-1.5">
                      <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-medium leading-none text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email || `+91 ${user.phone}`}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => navigate("/profile/details")}
                      className="cursor-pointer font-medium text-xs py-2"
                    >
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/profile/orders")}
                      className="cursor-pointer font-medium text-xs py-2"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Orders</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/profile/addresses")}
                      className="cursor-pointer font-medium text-xs py-2"
                    >
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Addresses</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer font-medium text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4 text-destructive" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    className="rounded-full bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-medium font-subheader px-4 h-9 shadow-md transition-all cursor-pointer"
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

        {/* Expandable Mobile Search Bar */}
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
