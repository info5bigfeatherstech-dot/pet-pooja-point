// src/api/restaurantApi.js - Data access functions for restaurants, collections, localities, and cuisines
import axiosInstance from "./axiosInstance"
import { delay } from "../utils/delay"
import { restaurants as mockRestaurants } from "../data/restaurants"
import { collections as mockCollections } from "../data/collections"
import { localities as mockLocalities } from "../data/localities"
import { cuisines as mockCuisines } from "../data/cuisines"

/**
 * Fetches paginated, filtered, and sorted restaurants
 * @param {Object} params - Query parameters including filters and pagination
 */
export async function getRestaurants(params = {}) {
  const {
    page = 1,
    limit = 8,
    city = "Delhi NCR",
    activeEntry = "delivery",
    search = "",
    locality = "",
    rating4Plus = false,
    pureVeg = false,
    openNow = false,
    cuisine = "",
    sortBy = "rating",
  } = params

  await delay(600)

  // Real API call (commented out for now, to be switched seamlessly):
  // return (await axiosInstance.get('/restaurants', { params })).data

  let results = [...mockRestaurants]

  // Filter: search text match on name, cuisine, or locality
  if (search && search.trim() !== "") {
    const q = search.trim().toLowerCase()
    results = results.filter((r) => {
      const matchName = r.name.toLowerCase().includes(q)
      const matchLocality = r.locality.toLowerCase().includes(q)
      const matchCuisine = r.cuisines.some((c) => c.toLowerCase().includes(q))
      return matchName || matchLocality || matchCuisine
    })
  }

  if (locality && locality.trim() !== "") {
    const targetLocality = locality.trim().toLowerCase()
    results = results.filter((restaurant) =>
      restaurant.locality.toLowerCase() === targetLocality
    )
  }

  // Filter: rating >= 4.0
  if (rating4Plus) {
    results = results.filter((r) => r.rating >= 4.0)
  }

  // Filter: pure veg
  if (pureVeg) {
    results = results.filter((r) => r.isVeg === true)
  }

  // Filter: open now
  if (openNow) {
    results = results.filter((r) => r.isOpen === true)
  }

  // Filter: cuisine match
  if (cuisine && cuisine !== "all" && cuisine.trim() !== "") {
    const targetCuisine = cuisine.toLowerCase()
    results = results.filter((r) =>
      r.cuisines.some((c) => c.toLowerCase() === targetCuisine)
    )
  }

  // Filter: active entry category contextual refinement
  if (activeEntry === "delivery") {
    // Delivery focused
    results = results.filter((r) => r.deliveryTime && !r.deliveryTime.toLowerCase().includes("dine-in only"))
  } else if (activeEntry === "nightlife") {
    // Nightlife, cocktails, bars, late night
    results = results.filter((r) =>
      r.cuisines.some((c) =>
        ["cocktails", "finger food", "continental", "bbq", "asian"].includes(c.toLowerCase())
      ) || r.priceForTwo >= 1200
    )
  }

  // Sorting
  if (sortBy === "rating") {
    results.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "priceAsc") {
    results.sort((a, b) => a.priceForTwo - b.priceForTwo)
  } else if (sortBy === "priceDesc") {
    results.sort((a, b) => b.priceForTwo - a.priceForTwo)
  } else if (sortBy === "distance") {
    results.sort((a, b) => a.distanceKm - b.distanceKm)
  }

  // Pagination
  const start = (page - 1) * limit
  const end = start + limit
  const pagedItems = results.slice(start, end)
  const total = results.length
  const hasNextPage = end < total

  return {
    items: pagedItems,
    total,
    page,
    limit,
    nextPage: hasNextPage ? page + 1 : undefined,
  }
}

export function getRestaurantById(id) {
  return mockRestaurants.find((restaurant) => restaurant.id === id)
}

/**
 * Fetches curated collections
 */
export async function getCollections() {
  await delay(600)
  // Real API call:
  // return (await axiosInstance.get('/collections')).data
  return mockCollections
}

/**
 * Fetches popular localities for a given city
 * @param {string} city
 */
export async function getLocalities(city = "Delhi NCR") {
  await delay(600)
  // Real API call:
  // return (await axiosInstance.get('/localities', { params: { city } })).data
  return mockLocalities
}

/**
 * Fetches popular cuisines list
 */
export async function getCuisines() {
  await delay(600)
  // Real API call:
  // return (await axiosInstance.get('/cuisines')).data
  return mockCuisines
}
