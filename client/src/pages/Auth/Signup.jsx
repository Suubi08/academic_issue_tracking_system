"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../../utils/axiosInstance"
import { roles, departments, colleges } from "../../constants"

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
  })

  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const nextStep = (e) => {
    e.preventDefault()
    if (formData.role) {
      setStep((prevStep) => prevStep + 1)
    }
  }

  const prevStep = () => setStep((prevStep) => prevStep - 1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      await API.post("register/", formData)
      alert("Registration successful! Please login.")
      navigate("/login")
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center mb-8">
        <img src="/placeholder.svg" alt="AITS Logo" className="w-20 h-20 mb-4" />
        <h2 className="font-bold text-center text-3xl text-gray-800">Join AITS, Create an Account</h2>
        <p className="mt-2 text-center text-lg text-gray-600 max-w-md">Let's get you started quickly and easily!</p>
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {error && <div className="p-2 bg-red-100 text-red-700 rounded mb-4">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <div className="flex space-x-2">
                <input
                  className="input_style flex-1"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={formData.first_name}
                  required
                />
                <input
                  className="input_style flex-1"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={formData.last_name}
                  required
                />
              </div>

              <input
                className="input_style"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
                required
              />

              <input
                className="input_style"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                required
              />

              <input
                className="input_style"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                required
              />

              <input
                className="input_style"
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirm_password}
                required
              />

              {formData.password && formData.confirm_password && (
                <p
                  className={`text-sm ${
                    formData.password === formData.confirm_password ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formData.password === formData.confirm_password ? "Passwords match" : "Passwords do not match"}
                </p>
              )}

              <select className="selection_input" name="role" onChange={handleChange} value={formData.role} required>
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className={`auth_button ${!formData.role ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={nextStep}
                disabled={!formData.role}
              >
                Next
              </button>
            </>
          )}

          {/* Step 2: Role-Specific Fields */}
          {step === 2 && (
            <>
              {formData.role === "student" && (
                <>
                  <input
                    className="input_style"
                    type="text"
                    name="student_number"
                    placeholder="Student Number"
                    onChange={handleChange}
                    value={formData.student_number}
                    required
                  />

                  <input
                    className="input_style"
                    type="text"
                    name="course_name"
                    placeholder="Course Name"
                    onChange={handleChange}
                    value={formData.course_name}
                    required
                  />
                </>
              )}

              {formData.role === "lecturer" && (
                <>
                  <input
                    className="input_style"
                    type="text"
                    name="lecture_number"
                    placeholder="Lecturer Number"
                    onChange={handleChange}
                    value={formData.lecture_number}
                    required
                  />

                  <input
                    className="input_style"
                    type="text"
                    name="subject_taught"
                    placeholder="Subject Taught"
                    onChange={handleChange}
                    value={formData.subject_taught}
                    required
                  />
                </>
              )}

              {(formData.role === "student" || formData.role === "lecturer") && (
                <>
                  <select
                    name="department"
                    className="selection_input"
                    onChange={handleChange}
                    value={formData.department}
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>

                  <select
                    name="college"
                    className="selection_input"
                    onChange={handleChange}
                    value={formData.college}
                    required
                  >
                    <option value="">Select college</option>
                    {colleges.map((college) => (
                      <option key={college.value} value={college.value}>
                        {college.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {(formData.role === "academic_registrar" || formData.role === "admin") && (
                <select
                  name="college"
                  className="selection_input"
                  onChange={handleChange}
                  value={formData.college}
                  required
                >
                  <option value="">Select college</option>
                  {colleges.map((college) => (
                    <option key={college.value} value={college.value}>
                      {college.label}
                    </option>
                  ))}
                </select>
              )}

              <div className="flex justify-between gap-4">
                <button type="button" className="auth_button bg-gray-500" onClick={prevStep}>
                  Back
                </button>
                <button
                  type="submit"
                  className={`auth_button ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </>
          )}
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup

