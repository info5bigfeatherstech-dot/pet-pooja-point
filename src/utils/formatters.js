// src/utils/formatters.js - Data formatters for currency, distances, and counts
export const formatPriceForTwo = (price) => {
  return `₹${price} for two`
}

export const formatDistance = (km) => {
  return `${km} km`
}

export const formatRatingCount = (count) => {
  if (!count && count !== 0) return ''
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`
  }
  return `${count}`
}
