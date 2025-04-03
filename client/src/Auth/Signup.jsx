import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { roles, colleges, departments } from "../constants";

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

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await API.post("register/", formData);
      alert("Registration successful!");
      navigate("/studentdashboard");
    } catch (error) {
      setError(
        error.response?.data?.error || "Signup failed. Please try again."
      );
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                onClick={() => setStep(2)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Next"}
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Back"}
                </button>
                <button
                  type="submit"
                  className="auth_button bg-blue-600 text-white hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
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
