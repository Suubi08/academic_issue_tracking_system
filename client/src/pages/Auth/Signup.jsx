"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Default role
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      // For demo purposes, we'll simulate a successful signup
      // In a real app, you would use the API call below
      // const response = await API.post("register/", formData)

      // Set token expiry to 24 hours from now
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 24)

      // Store tokens and user info
      localStorage.setItem("accessToken", "demo-token")
      localStorage.setItem("refreshToken", "demo-refresh-token")
      localStorage.setItem("role", formData.role)
      localStorage.setItem("username", formData.username)
      localStorage.setItem("tokenExpiry", expiryDate.toISOString())

      // Redirect based on role
      const roleRedirects = {
        admin: "/admin-dashboard",
        student: "/studentdashboard",
        lecturer: "/lecturer-dashboard",
        academic_registrar: "/registrar-dashboard",
      }

      // Navigate to the appropriate dashboard
      navigate(roleRedirects[formData.role], { replace: true })
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signup failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up for AITS</h2>
        <p className="text-center text-gray-600 mt-2">Academic Issue Tracking System</p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              id="role"
              name="role"
              onChange={handleChange}
              value={formData.role}
              required
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
              <option value="academic_registrar">Academic Registrar</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-blue-500">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup

