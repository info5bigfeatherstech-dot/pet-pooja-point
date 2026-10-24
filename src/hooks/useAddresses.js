// src/hooks/useAddresses.js - TanStack Query hooks for saved address management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/api/addressApi"

export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  })
}

export function useCreateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success("Address added successfully!")
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add address.")
    },
  })
}

export function useUpdateAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success("Address updated successfully!")
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update address.")
    },
  })
}

export function useDeleteAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success("Address deleted successfully!")
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete address.")
    },
  })
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => setDefaultAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast.success("Default address updated!")
    },
    onError: (err) => {
      toast.error(err.message || "Failed to set default address.")
    },
  })
}

export default useAddresses
