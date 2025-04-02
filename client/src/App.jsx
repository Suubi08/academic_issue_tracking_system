"use client"

import { useEffect } from "react"
import AllRoutes from "./routes/AllRoutes"
import "./App.css"

function App() {
  // Check for authentication on app load
  useEffect(() => {
    // This is where you would typically check if the token is valid
    // For demo purposes, we're just checking if it exists
    const token = localStorage.getItem("accessToken")
    const tokenExpiry = localStorage.getItem("tokenExpiry")

    // If token exists but is expired, clear it
    if (token && tokenExpiry && new Date(tokenExpiry) < new Date()) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("role")
      localStorage.removeItem("username")
      localStorage.removeItem("tokenExpiry")
    }
  }, [])

  return <AllRoutes />
}

export default App

