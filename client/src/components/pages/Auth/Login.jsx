"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Card } from "../../components/ui/Card"
import { Eye, EyeOff, LogIn } from "lucide-react"
import API from "../../../utils/axiosInstance"
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll use simple role detection based on username
      // In a real app, this would come from your authentication API
      let userRole = "student" // default role

      // Determine role based on username (case insensitive)
      const lowerUsername = username.toLowerCase()
      if (lowerUsername.includes("admin")) {
        userRole = "admin"
      } else if (lowerUsername.includes("lecturer")) {
        userRole = "lecturer"
      } else if (lowerUsername.includes("registrar")) {
        userRole = "academic_registrar"
      }

      // Store auth data in localStorage
      localStorage.setItem("accessToken", "demo-token-" + Math.random())
      localStorage.setItem("refreshToken", "demo-refresh-" + Math.random())
      localStorage.setItem("role", userRole)
      localStorage.setItem("username", username)

      // Set token expiry to 24 hours from now
      const expiryTime = new Date()
      expiryTime.setHours(expiryTime.getHours() + 24)
      localStorage.setItem("tokenExpiry", expiryTime.toISOString())

      // Navigate to the appropriate dashboard based on role
      if (userRole === "admin") {
        navigate("/admin-dashboard")
      } else if (userRole === "lecturer") {
        navigate("/lecturer-dashboard")
      } else if (userRole === "academic_registrar") {
        navigate("/registrar-dashboard")
      } else {
        navigate("/studentdashboard")
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.")
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Academic Issue Tracking System</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn size={18} /> Sign in
              </>
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login

