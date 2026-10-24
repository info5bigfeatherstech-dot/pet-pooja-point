// src/pages/ProfileDetailsTab.jsx - Profile details tab with profile header and edit form
import React from "react"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileForm from "@/components/profile/ProfileForm"
import CardSkeleton from "@/components/common/CardSkeleton"
import ErrorState from "@/components/common/ErrorState"
import { useUser } from "@/hooks/useUser"

export function ProfileDetailsTab() {
  const { data: user, isLoading, isError, refetch } = useUser()

  if (isLoading) {
    return <CardSkeleton />
  }

  if (isError || !user) {
    return (
      <ErrorState
        title="Could not load profile"
        message="Failed to load your profile details. Please try again."
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-medium font-poppins text-foreground tracking-tight">
          Personal Information
        </h2>
        <p className="text-xs text-muted-foreground font-subheader mt-0.5">
          Manage your personal details and contact information.
        </p>
      </div>

      <ProfileHeader user={user} />

      <div className="pt-2">
        <h3 className="text-sm font-medium font-poppins text-foreground mb-4">
          Edit Profile Details
        </h3>
        <ProfileForm user={user} />
      </div>
    </div>
  )
}

export default ProfileDetailsTab
