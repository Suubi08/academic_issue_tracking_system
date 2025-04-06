import axios from "axios"

// Base URL for the API
const BASE_URL = "http://127.0.0.1:8000/api/" // Replace with your actual API URL

// Create an Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

// Add a response interceptor to handle errors and token refresh
API.interceptors.response.use(
  (response) => response, // Return the full response object
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}token/refresh/`, {
            refresh: refreshToken,
          })

          // Update the tokens
          localStorage.setItem("accessToken", response.data.access)

          // Update the Authorization header
          originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`

          // Retry the original request
          return API(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("role")
        localStorage.removeItem("username")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

export default API

