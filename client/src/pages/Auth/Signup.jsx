
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from '../../utils/axiosInstance';
import { colleges, departments } from '../../constants';

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
  const [step, setStep] = useState(1);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = "register/";
      const response = await API.post(endpoint, formData);
      let role = "student"

      if (response.ok) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("role", role);
        localStorage.setItem("username", response.data.username)

        // Check for specific role keywords in the username
        const username = response.data.username.toLowerCase()
        if (username.includes("admin")) {
          role = "admin"
        } else if (username.includes("lecturer")) {
          role = "lecturer"
        } else if (username.includes("registrar")) {
          role = "academic_registrar"
        }

        console.log(`Login successful - Role: ${role}`)

        // Redirect based on role
        const roleRedirects = {
          admin: "/admin-dashboard",
          student: "/studentdashboard",
          lecturer: "/lecturer-dashboard",
          academic_registrar: "/registrar-dashboard",
        }

        // Navigate to the appropriate dashboard
        navigate(roleRedirects[role], { replace: true })
      } else {
        console.log("Failed to get a response")
      }

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select College
            </label>
            <select name='college' className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500" onChange={handleChange} value={formData.college} required>
              {colleges.map((college) => (
                <option key={college.value} value={college.value} disabled={college.disabled && !formData.college}>
                  {college.label}
                </option>
              ))}
            </select>
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

