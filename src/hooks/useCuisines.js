// src/hooks/useCuisines.js - TanStack Query hook for cuisines
import { useQuery } from "@tanstack/react-query"
import { getCuisines } from "../api/restaurantApi"

export function useCuisines() {
  return useQuery({
    queryKey: ["cuisines"],
    queryFn: () => getCuisines(),
  })
}

export default useCuisines
