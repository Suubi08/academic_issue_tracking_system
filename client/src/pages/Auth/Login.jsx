
import API from '../../utils/axiosInstance';
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const response = await API.post("login/", formData);

        if (response.status === 200) {
            const { access, refresh, username, role } = response.data; 

            // Store tokens in local storage
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);  // Store role correctly

            console.log(`Login successful - Role: ${role}`);

            // Role-based redirection
            const roleRedirects = {
                admin: "/admin-dashboard",
                student: "/studentdashboard",
                lecturer: "/lecturer-dashboard",
                academic_registrar: "/registrar-dashboard",
            };

            navigate(roleRedirects[role] || "/", { replace: true });

        } else {
            setError("Invalid credentials. Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error.response?.data);
        const errorMessage = error.response?.data?.error || "Login failed. Please check your credentials.";
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};

  

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login to AITS</h2>
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
              placeholder="Enter your username"
              onChange={handleChange}
              required
              autoComplete="username"
            />
            <p className="text-xs text-gray-500 mt-1">Try: student1, lecturer1, admin1, or registrar1</p>
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
              placeholder="Enter your password"
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <p className="text-xs text-gray-500 mt-1">Any password will work for this demo</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700"
            disabled={loading}
          >
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

