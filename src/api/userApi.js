// src/api/userApi.js - User profile API service with in-memory state and simulated delay
import { axiosInstance } from "./axiosInstance"
import { dummyUser } from "@/data/user"

let userStore = { ...dummyUser }

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

export const getUser = async () => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.get('/user/me')
  // return response.data
  return { ...userStore }
}

export const updateUser = async (updatedData) => {
  await delay(500)
  // Real API call:
  // const response = await axiosInstance.put('/user/me', updatedData)
  // return response.data
  userStore = { ...userStore, ...updatedData }
  return { ...userStore }
}

export default { getUser, updateUser }
