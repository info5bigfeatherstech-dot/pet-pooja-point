// src/utils/delay.js - Simulates network latency for dummy API responses
export const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))
