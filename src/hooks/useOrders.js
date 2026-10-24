// src/hooks/useOrders.js - TanStack Query hooks for querying and placing orders
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getOrders, placeOrder } from "@/api/orderApi"

export function useOrders(status = "all") {
  return useQuery({
    queryKey: ["orders", status],
    queryFn: () => getOrders(status),
  })
}

export function usePlaceOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderPayload) => placeOrder(orderPayload),
    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      toast.success("Order placed successfully! Preparing your feast.")
      return newOrder
    },
    onError: (err) => {
      toast.error(err.message || "Failed to place order. Please try again.")
    },
  })
}

export default useOrders
