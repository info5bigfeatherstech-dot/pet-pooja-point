// src/api/axiosInstance.js - Pre-configured Axios instance for future REST API integration
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.tablefy.example.com/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
