import { Title } from "@radix-ui/react-dialog";
import API from "../../utils/axiosInstance";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import logo2 from "../../assets/logo2.png";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send login request to the server
      const response = await API.post("login/", formData);
      console.log("Login Response:", response); // Debugging the response

      if (response.status === 200) {
        const { access, refresh, username, role, course, student_number, id } =
          response.data;

        // Store tokens and user info in local storage
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        localStorage.setItem("course", course);
        localStorage.setItem("student_number", student_number);
        localStorage.setItem("id", id);
        localStorage.setItem("userId", id); // <-- Correct way

        console.log(`Login successful - Role: ${role}`);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${username}!`,
        });

        // Role-based redirection
        const roleRedirects = {
          admin: "/admin-dashboard",
          student: "/student-dashboard",
          lecturer: "/lecturer-dashboard",
          academic_registrar: "/registrar-dashboard",
        };

        if (roleRedirects[role]) {
          navigate(roleRedirects[role], { replace: true });
        } else {
          setError("Invalid role. Please contact support.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      //console.error("Login error:", error.response?.data);
      const errorMessage =
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <img src={logo2} alt="Logo" className="w-40 h-30" />
        </div>
        <h2 className="text-2xl font-bold text-center">Login to AITS</h2>
        <p className="text-center text-gray-600 mt-2">
          Academic Issue Tracking System
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-blue-500 cursor-pointer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
