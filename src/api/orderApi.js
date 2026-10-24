// src/api/orderApi.js - Order API service with in-memory state and simulated delay
import { axiosInstance } from "./axiosInstance"
import { dummyOrders } from "@/data/orders"

let ordersStore = [...dummyOrders]

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const getOrders = async (status = "all") => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.get('/orders', { params: { status } })
  // return response.data

  if (!status || status === "all") {
    return [...ordersStore]
  }

  if (status === "ongoing") {
    return ordersStore.filter((o) =>
      ["placed", "preparing", "out_for_delivery"].includes(o.status)
    )
  }

  return ordersStore.filter((o) => o.status === status)
}

export const getOrderById = async (id) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.get(`/orders/${id}`)
  // return response.data

  const order = ordersStore.find((o) => o.id === id)
  if (!order) {
    throw new Error(`Order with ID ${id} not found.`)
  }
  return { ...order }
}

export const placeOrder = async (orderPayload) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.post('/orders', orderPayload)
  // return response.data

  const newId = `ord-${Date.now()}`
  const orderNumber = `TF-${Math.floor(10000 + Math.random() * 90000)}`

  const newOrder = {
    ...orderPayload,
    id: newId,
    orderNumber,
    status: "placed",
    placedAt: new Date().toISOString(),
  }

  ordersStore = [newOrder, ...ordersStore]
  return { ...newOrder }
}

export default {
  getOrders,
  getOrderById,
  placeOrder,
}
