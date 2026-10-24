// src/components/profile/ProfileSidebar.jsx - Navigation links for Profile, Orders, Addresses, and Logout
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { User, ShoppingBag, MapPin, LogOut } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "My Orders", path: "/profile/orders", icon: ShoppingBag },
  { label: "Profile Details", path: "/profile/details", icon: User },
  { label: "Saved Addresses", path: "/profile/addresses", icon: MapPin },
]

export function ProfileSidebar({ className = "" }) {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <>
      {/* Desktop Sidebar (lg+) */}
      <div className={cn("hidden lg:flex flex-col justify-between h-full panel", className)}>
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider font-subheader mb-3 px-3">
            Account Management
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium font-subheader transition-all duration-200 select-none",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-foreground hover:bg-muted text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-4 border-t border-border mt-6">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer select-none"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Chip Row (<lg) */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "chip text-xs font-medium shrink-0 flex items-center gap-1.5",
                  isActive ? "chip-active" : ""
                )
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="chip text-xs font-medium shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10 flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}

export default ProfileSidebar
