// src/components/address/AddressCard.jsx - Card displaying saved address with action buttons or selection mode
import React, { useState } from "react"
import { Home, Briefcase, MapPin, Edit3, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { cn } from "@/lib/utils"

export function AddressCard({
  address,
  isSelected = false,
  isSelectable = false,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
  className = "",
}) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  if (!address) return null

  const { id, label, name, phone, line1, line2, landmark, city, pincode, isDefault } = address

  const getLabelIcon = () => {
    switch (label?.toLowerCase()) {
      case "home":
        return <Home className="w-4 h-4 text-primary" />
      case "work":
        return <Briefcase className="w-4 h-4 text-primary" />
      default:
        return <MapPin className="w-4 h-4 text-primary" />
    }
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    onDelete?.(id)
    setDeleteConfirmOpen(false)
  }

  return (
    <>
      <div
        onClick={isSelectable ? () => onSelect?.(address) : undefined}
        className={cn(
          "panel relative flex flex-col justify-between transition-all duration-200 select-none text-left",
          isSelectable ? "cursor-pointer hover:border-primary" : "",
          isSelected
            ? "border-primary ring-2 ring-primary/20 bg-primary/5"
            : "hover:border-border",
          className
        )}
      >
        <div>
          {/* Top row: Label + Default badge / Selection indicator */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                {getLabelIcon()}
              </div>
              <span className="font-medium text-sm capitalize font-poppins text-foreground">
                {label}
              </span>
              {isDefault && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/30 text-[10px] font-medium px-2 py-0.5 rounded-full"
                >
                  Default
                </Badge>
              )}
            </div>

            {isSelectable && (
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-background"
                )}
              >
                {isSelected && <CheckCircle2 className="w-4 h-4 text-white fill-primary" />}
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-1 mb-3">
            <p className="text-xs sm:text-sm font-medium text-foreground font-poppins">
              {name}{" "}
              <span className="text-muted-foreground font-normal font-subheader">
                • +91 {phone}
              </span>
            </p>

            <p className="text-xs text-muted-foreground font-subheader leading-relaxed">
              {line1}
              {line2 && `, ${line2}`}
              {landmark && ` (Near ${landmark})`}
            </p>
            <p className="text-xs text-muted-foreground font-subheader">
              {city} - {pincode}
            </p>
          </div>
        </div>

        {/* Action Buttons (Only in management mode, not in simple selection mode) */}
        {!isSelectable && (
          <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-2">
            <div>
              {!isDefault && onSetDefault && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSetDefault(id)
                  }}
                  className="text-xs text-primary hover:text-primary-hover hover:bg-primary/10 px-2 h-7 font-medium rounded-lg"
                >
                  Set as default
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.(address)
                }}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground font-medium rounded-lg"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDeleteClick}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 font-medium rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Address"
        description={`Are you sure you want to delete this ${label} address? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Keep"
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default AddressCard
