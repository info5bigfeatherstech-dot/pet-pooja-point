// src/components/address/AddressDialog.jsx - Dialog wrapper for creating or editing an address
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import AddressForm from "./AddressForm"

export function AddressDialog({
  open,
  onOpenChange,
  address = null,
  onSubmit,
  isLoading = false,
}) {
  const isEditing = Boolean(address?.id)

  const handleFormSubmit = async (values) => {
    await onSubmit?.(values)
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium font-poppins">
            {isEditing ? "Edit Delivery Address" : "Add New Delivery Address"}
          </DialogTitle>
          <DialogDescription className="text-xs font-subheader">
            {isEditing
              ? "Update your contact and location details for seamless delivery."
              : "Enter your complete address details for timely food delivery."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <AddressForm
            initialValues={address}
            onSubmit={handleFormSubmit}
            onCancel={() => onOpenChange?.(false)}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddressDialog
