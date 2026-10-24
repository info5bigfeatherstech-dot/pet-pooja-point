// src/pages/AddressesTab.jsx - Saved addresses management tab with edit, delete, and default options
import React, { useState } from "react"
import { Plus, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddressCard from "@/components/address/AddressCard"
import AddressDialog from "@/components/address/AddressDialog"
import EmptyState from "@/components/common/EmptyState"
import ErrorState from "@/components/common/ErrorState"
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/hooks/useAddresses"

export function AddressesTab() {
  const { data: addresses = [], isLoading, isError, refetch } = useAddresses()
  const createMutation = useCreateAddress()
  const updateMutation = useUpdateAddress()
  const deleteMutation = useDeleteAddress()
  const setDefaultMutation = useSetDefaultAddress()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const handleOpenCreate = () => {
    setEditingAddress(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (address) => {
    setEditingAddress(address)
    setDialogOpen(true)
  }

  const handleFormSubmit = async (values) => {
    if (editingAddress?.id) {
      await updateMutation.mutateAsync({ id: editingAddress.id, data: values })
    } else {
      await createMutation.mutateAsync(values)
    }
  }

  const handleDelete = async (id) => {
    await deleteMutation.mutateAsync(id)
  }

  const handleSetDefault = async (id) => {
    await setDefaultMutation.mutateAsync(id)
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-medium font-poppins text-foreground tracking-tight">
            Saved Addresses
          </h2>
          <p className="text-xs text-muted-foreground font-subheader mt-0.5">
            Manage your delivery locations for faster and easier ordering.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-medium text-xs sm:text-sm h-9 px-4 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add new address
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-44 rounded-2xl bg-muted/60 animate-pulse" />
          <div className="h-44 rounded-2xl bg-muted/60 animate-pulse" />
        </div>
      ) : isError ? (
        <ErrorState
          title="Could not load addresses"
          message="Failed to fetch your saved addresses. Please try again."
          onRetry={refetch}
        />
      ) : addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No saved addresses"
          message="You haven't saved any addresses yet. Add your home or office address to get food delivered faster!"
          actionLabel="Add your first address"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      {/* Generic Address Create / Edit Dialog */}
      <AddressDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        address={editingAddress}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  )
}

export default AddressesTab
