// src/hooks/useLocalities.js - TanStack Query hook for city localities
import { useQuery } from "@tanstack/react-query"
import { getLocalities } from "../api/restaurantApi"
import useLocationStore from "../store/locationStore"

export function useLocalities() {
  const city = useLocationStore((state) => state.city)

  return useQuery({
    queryKey: ["localities", city],
    queryFn: () => getLocalities(city),
  })
}

export default useLocalities
