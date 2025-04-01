"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import API from "../../utils/axiosInstance"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/studentdashboard"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await API.post("login/", formData)
      const data = response.data

      // Store tokens and user info
      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      localStorage.setItem("role", data.role || "student")
      localStorage.setItem("username", formData.username)

      // Redirect to the page they were trying to access or dashboard
      navigate(from, { replace: true })
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login to AITS</h2>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <input
            className="input_style"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <input
            className="input_style"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button type="submit" className="auth_button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-blue-500">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login

