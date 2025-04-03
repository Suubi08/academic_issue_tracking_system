"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Card } from "../../components/ui/Card"
import { Eye, EyeOff, UserPlus } from "lucide-react"

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "student", // Default role
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store auth data in localStorage (for demo purposes)
      localStorage.setItem("accessToken", "demo-token-" + Math.random())
      localStorage.setItem("refreshToken", "demo-refresh-" + Math.random())
      localStorage.setItem("role", formData.role)
      localStorage.setItem("username", formData.username)

      // Set token expiry to 24 hours from now
      const expiryTime = new Date()
      expiryTime.setHours(expiryTime.getHours() + 24)
      localStorage.setItem("tokenExpiry", expiryTime.toISOString())

      // Navigate to the appropriate dashboard based on role
      if (formData.role === "admin") {
        navigate("/admin-dashboard")
      } else if (formData.role === "lecturer") {
        navigate("/lecturer-dashboard")
      } else if (formData.role === "academic_registrar") {
        navigate("/registrar-dashboard")
      } else {
        navigate("/studentdashboard")
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
      console.error("Signup error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join the Academic Issue Tracking System</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
              <option value="academic_registrar">Academic Registrar</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus size={18} /> Sign up
              </>
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Signup

