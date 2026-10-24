// src/api/addressApi.js - Address management API service with in-memory state and simulated delay
import { axiosInstance } from "./axiosInstance"
import { dummyAddresses } from "@/data/addresses"

let addressesStore = [...dummyAddresses]

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAddresses = async () => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.get('/addresses')
  // return response.data
  return [...addressesStore]
}

export const createAddress = async (addressData) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.post('/addresses', addressData)
  // return response.data

  const newId = `addr-${Date.now()}`
  let isDefault = addressData.isDefault || addressesStore.length === 0

  if (isDefault) {
    addressesStore = addressesStore.map((a) => ({ ...a, isDefault: false }))
  }

  const newAddress = {
    ...addressData,
    id: newId,
    isDefault,
  }

  addressesStore = [newAddress, ...addressesStore]
  return { ...newAddress }
}

export const updateAddress = async (id, addressData) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.put(`/addresses/${id}`, addressData)
  // return response.data

  if (addressData.isDefault) {
    addressesStore = addressesStore.map((a) => ({ ...a, isDefault: false }))
  }

  addressesStore = addressesStore.map((a) => {
    if (a.id === id) {
      return { ...a, ...addressData }
    }
    return a
  })

  return addressesStore.find((a) => a.id === id)
}

export const deleteAddress = async (id) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.delete(`/addresses/${id}`)
  // return response.data

  const target = addressesStore.find((a) => a.id === id)
  if (target?.isDefault && addressesStore.length > 1) {
    throw new Error("Default address cannot be deleted while other addresses exist.")
  }

  addressesStore = addressesStore.filter((a) => a.id !== id)
  return { success: true, id }
}

export const setDefaultAddress = async (id) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.post(`/addresses/${id}/default`)
  // return response.data

  addressesStore = addressesStore.map((a) => ({
    ...a,
    isDefault: a.id === id,
  }))

  return addressesStore.find((a) => a.id === id)
}

export default {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
}
