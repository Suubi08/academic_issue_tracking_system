import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../../utils/axiosInstance';
import { roles, colleges, departments } from "../../constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
    student_number: "",
    course_name: "",
    subject_taught: "",
    college: "",
    department: "",
    lecture_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await API.post("register/", formData);
  
      if (response.status === 201) {
        // Extract data
        const { access, refresh, username } = response.data;
  
        // Store tokens in local storage
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("username", username);
  
        // Determine role based on username
        let role = "student";
        if (username.toLowerCase().includes("admin")) {
          role = "admin";
        } else if (username.toLowerCase().includes("lecturer")) {
          role = "lecturer";
        } else if (username.toLowerCase().includes("registrar")) {
          role = "academic_registrar";
        }
  
        // Store role in local storage
        localStorage.setItem("role", role);
  
        console.log(`Registration successful - Role: ${role}`);
  
        // Role-based redirection
        const roleRedirects = {
          admin: "/admin-dashboard",
          student: "/studentdashboard",
          lecturer: "/lecturer-dashboard",
          academic_registrar: "/registrar-dashboard",
        };
  
        navigate(roleRedirects[role], { replace: true });
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up for AITS</h2>
        <p className="text-center text-gray-600 mt-2">
          Academic Issue Tracking System
        </p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Firstname
                </label>
                <input
                  className="input_style"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lastname
                </label>
                <input
                  className="input_style"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  className="input_style"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="input_style"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  className="input_style"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  className="input_style"
                  type="password"
                  name="confirm_password"
                  placeholder="confirm_password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="selection_input"
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                  required
                >
                  {roles.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}
                      disabled={role.disabled}
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="auth_button"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {formData.role === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student Number
                    </label>
                    <input
                      className="input_style"
                      type="text"
                      name="student_number"
                      placeholder="Student Number"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Course name
                    </label>
                    <input
                      className="input_style"
                      type="text"
                      name="course_name"
                      placeholder="Course Name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <select
                      className="selection_input"
                      name="department"
                      onChange={handleChange}
                      value={formData.department}
                      required
                    >
                      {departments.map((dept) => (
                        <option
                          key={dept.value}
                          value={dept.value}
                          disabled={dept.disabled}
                        >
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              {formData.role === "lecturer" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lecturer Number
                    </label>
                    <input
                      className="input_style"
                      type="text"
                      name="lecture_number"
                      placeholder="Lecturer Number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subject Taught
                    </label>
                    <input
                      className="input_style"
                      type="text"
                      name="subject_taught"
                      placeholder="Subject Taught"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <select
                      className="selection_input"
                      name="department"
                      onChange={handleChange}
                      value={formData.department}
                      required
                    >
                      {departments.map((dept) => (
                        <option
                          key={dept.value}
                          value={dept.value}
                          disabled={dept.disabled}
                        >
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  College/School
                </label>
                <select
                  className="selection_input"
                  name="college"
                  onChange={handleChange}
                  value={formData.college}
                  required
                >
                  {colleges.map((college) => (
                    <option
                      key={college.value}
                      value={college.value}
                      disabled={college.disabled}
                    >
                      {college.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="auth_button bg-gray-500"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button type="submit" className="auth_button">
                  Register
                </button>
              </div>
            </>
          )}
        </form>
        <p className="text-center mt-4 text-blue-500">
          Don't have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;