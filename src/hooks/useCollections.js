// src/hooks/useCollections.js - TanStack Query hook for restaurant collections
import { useQuery } from "@tanstack/react-query"
import { getCollections } from "../api/restaurantApi"

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  })
}

export default useCollections
