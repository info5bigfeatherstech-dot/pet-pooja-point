// src/components/address/AddressSelector.jsx - Selectable delivery address picker for Checkout
import React, { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddressCard from "./AddressCard"
import AddressDialog from "./AddressDialog"
import { useAddresses, useCreateAddress } from "@/hooks/useAddresses"

export function AddressSelector({ selectedAddressId, onSelectAddress }) {
  const { data: addresses = [], isLoading } = useAddresses()
  const createAddressMutation = useCreateAddress()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCreateNew = async (addressData) => {
    const created = await createAddressMutation.mutateAsync(addressData)
    if (created?.id) {
      onSelectAddress(created.id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-subheader text-muted-foreground capitalize">
          Select where you want your food delivered:
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDialogOpen(true)}
          className="rounded-xl border-dashed border-primary text-primary hover:bg-primary/10 text-xs font-medium h-8"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add new address
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-28 rounded-2xl bg-muted/60 animate-pulse" />
          <div className="h-28 rounded-2xl bg-muted/60 animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isSelectable={true}
              isSelected={selectedAddressId === addr.id}
              onSelect={() => onSelectAddress(addr.id)}
            />
          ))}
        </div>
      )}

      {/* Address Dialog for adding new address */}
      <AddressDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateNew}
        isLoading={createAddressMutation.isPending}
      />
    </div>
  )
}

export default AddressSelector
