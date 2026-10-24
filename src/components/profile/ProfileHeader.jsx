// src/components/profile/ProfileHeader.jsx - Header displaying user avatar, name, and contact info
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone } from "lucide-react"

export function ProfileHeader({ user }) {
  if (!user) return null

  const { name, email, phone, avatar } = user
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U"

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-border text-center sm:text-left">
      <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary/20 shrink-0 shadow-sm">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-medium font-poppins text-foreground tracking-tight">
          {name}
        </h2>
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground font-subheader">
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-primary" />
            {email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-primary" />
            +91 {phone}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
