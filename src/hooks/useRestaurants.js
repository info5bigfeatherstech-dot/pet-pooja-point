// src/hooks/useRestaurants.js - TanStack Query infinite query hook for restaurants
import { useInfiniteQuery } from "@tanstack/react-query"
import { getRestaurants } from "../api/restaurantApi"
import useFilterStore from "../store/filterStore"
import useLocationStore from "../store/locationStore"

export function useRestaurants() {
  const city = useLocationStore((state) => state.city)
  const activeEntry = useFilterStore((state) => state.activeEntry)
  const search = useFilterStore((state) => state.search)
  const rating4Plus = useFilterStore((state) => state.rating4Plus)
  const pureVeg = useFilterStore((state) => state.pureVeg)
  const openNow = useFilterStore((state) => state.openNow)
  const cuisine = useFilterStore((state) => state.cuisine)
  const sortBy = useFilterStore((state) => state.sortBy)

  const filterParams = {
    city,
    activeEntry,
    search,
    rating4Plus,
    pureVeg,
    openNow,
    cuisine,
    sortBy,
  }

  return useInfiniteQuery({
    queryKey: ["restaurants", filterParams],
    queryFn: ({ pageParam = 1 }) =>
      getRestaurants({
        ...filterParams,
        page: pageParam,
        limit: 8,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })
}

export default useRestaurants
