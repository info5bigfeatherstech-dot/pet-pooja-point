// src/utils/formatters.js - Data formatters for currency, dates, distances, counts, and statuses

export const formatPriceForTwo = (price) => {
  return `₹${price} for two`
}

export const formatDistance = (km) => {
  return `${km} km`
}

export const formatRatingCount = (count) => {
  if (!count && count !== 0) return ""
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`
  }
  return `${count}`
}

export const formatCurrency = (amount) => {
  const num = Number(amount) || 0
  return `₹${num.toLocaleString("en-IN")}`
}

export const formatDate = (isoString) => {
  if (!isoString) return ""
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return isoString
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export const formatOrderStatus = (status) => {
  const map = {
    placed: "Order Placed",
    preparing: "Preparing Food",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  }
  return map[status] || status || "Processing"
}
