// src/pages/ProfilePage.jsx - Profile layout with sidebar on desktop, chips on mobile, and nested tab views
import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import PageLayout from "@/components/layout/PageLayout"
import ProfileSidebar from "@/components/profile/ProfileSidebar"

export function ProfilePage() {
  const location = useLocation()

  // Redirect /profile to /profile/orders
  if (location.pathname === "/profile" || location.pathname === "/profile/") {
    return <Navigate to="/profile/orders" replace />
  }

  return (
    <PageLayout className="pt-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Sidebar (Desktop) or Horizontal Chips (Mobile) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <ProfileSidebar />
        </div>

        {/* Right: Tab Content Area */}
        <div className="lg:col-span-8 xl:col-span-9 panel">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  )
}

export default ProfilePage
