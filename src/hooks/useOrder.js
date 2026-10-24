// src/hooks/useOrder.js - TanStack Query hook for single order details
import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "@/api/orderApi"

export function useOrder(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  })
}

export default useOrder
