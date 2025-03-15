import React, { useState } from 'react';
import axios from "axios";

import { roles, colleges, departments } from '../constants';
import API from '../utils/axiosInstance';

const initialState = {
    first_name: "", // Convert React's "FirstName" to "first_name"
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
};

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [step, setStep] = useState(1);
    const [error, setError] = useState(""); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    console.log("Form Data Before Sending:", formData);

    try {
        const endpoint = isSignup ? "register/" : "login/";
        const response = await API.post(endpoint, formData);

        if (isSignup) {
            alert("Registration successful!");
            setIsSignup(false); // Switch to login form
        } else {
            // Store JWT tokens
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            localStorage.setItem("role", response.data.role);

            console.log("Login successful:", response.data);
            alert("Login successful!");

            const roleRedirects = {
                "admin": "/admin-dashboard",
                "student": "/student-dashboard",
                "lecturer": "/lecturer-dashboard",
                "academic_registrar": "/registrar-dashboard"
            };

            window.location.href = roleRedirects[response.data.role] || "/dashboard";
        }
    } catch (error) {
        setError(error.response?.data?.error || "Something went wrong. Please try again.");
        console.error("Error:", error);
    }
};

    
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className='flex flex-col min-h-screen items-center justify-center bg-gray-50'>
            <div className='flex flex-col items-center mb-8'>
                <img src='' alt='AITS Logo' className='w-20 h-20 mb-4' />
                <h2 className='font-bold text-center text-3xl text-gray-800'>
                    {isSignup ? "Join AITS, Create an Account" : "Welcome Back to AITS"}
                </h2>
                <p className='mt-2 text-center text-lg text-gray-600 max-w-md'>
                    Let's get you started quickly and easily!
                </p>
            </div>

            {/* Form Container */}
            <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/*Step 1: Basic Info*/}
                    {step === 1 && (
                        <>
                            {isSignup && (
                                <>
                                    <div className='flex space-x-2'>
                                        <input
                                            className='input_style flex-1'
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            className='input_style flex-1'
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <input 
                                className='input_style' 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                onChange={handleChange} 
                                required 
                            />

                            {isSignup && 
                                <input
                                    className='input_style' 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    onChange={handleChange} 
                                    required 
                                />
                            }

                            <input 
                                className='input_style' 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                onChange={handleChange} 
                                required 
                            />

                            {isSignup && 
                                <input
                                    className='input_style' 
                                    type="password" 
                                    name="confirm_password" 
                                    placeholder="Confirm Password" 
                                    onChange={handleChange} 
                                    required 
                                />
                            }
                            
                            {isSignup && (
                                <select className='selection_input' name='role' onChange={handleChange} value={formData.role} required>
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value} disabled={role.disabled && !formData.role}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {isSignup && (
                                <button type="button" className="auth_button" onClick={nextStep}>
                                    Next
                                </button>
                            )}
                        </>
                    )}

                    {/* Step 2: Role-Specific Fields */}
                    {isSignup && step === 2 && (
                        <>
                            {formData.role === "student" && (
                                <>
                                    <input
                                        className='input_style' 
                                        type="text" 
                                        name="student_number" 
                                        placeholder="Student Number" 
                                        onChange={handleChange} 
                                        required 
                                    />

                                    <input 
                                        className='input_style' 
                                        type="text" 
                                        name="course_name" 
                                        placeholder="Course Name" 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </>
                            )}

                            {formData.role === "lecturer" && (
                                <>
                                    <input
                                        className='input_style' 
                                        type="text" 
                                        name="lecture_number" 
                                        placeholder="Lecturer Number" 
                                        onChange={handleChange} 
                                        required 
                                    />

                                    <input
                                        className='input_style' 
                                        type="text" 
                                        name="subject_taught" 
                                        placeholder="Subject Taught" 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </>

                            )}

                            {(formData.role === "student" || formData.role === "lecturer") && (
                                <>
                                    <select name="department" className='selection_input' onChange={handleChange} value={formData.department} required>
                                        {departments.map((dept) => (
                                            <option key={dept.value} value={dept.value} disabled={dept.disabled && !formData.dept}>
                                                {dept.label}
                                            </option>
                                        ))}
                                    </select>

                                    <select name='college' className='selection_input' onChange={handleChange} value={formData.college} required>
                                        {colleges.map((college) => (
                                            <option key={college.value} value={college.value} disabled={college.disabled && !formData.college}>
                                                {college.label}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {(formData.role === "academic_registrar" || formData.role === "admin") && (
                                <select name='college' className='selection_input' onChange={handleChange} value={formData.college} required>
                                    {colleges.map((college) => (
                                        <option key={college.value} value={college.value} disabled={college.disabled && !formData.college}>
                                            {college.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <div className="flex justify-between gap-4">
                                <button type="button" className="auth_button bg-gray-500" onClick={prevStep}>
                                    Back
                                </button>
                                <button type="submit" className="auth_button">
                                    Register
                                </button>
                            </div>
                        </>
                    )}

                    {/*  Login Button if not Signup */}
                    {!isSignup && <button className='auth_button' type='submit'>Login</button>}
                </form>

                {/* Toggle Signup/Login */}
                <p onClick={() => { setIsSignup(!isSignup); setStep(1); }} className='text-blue-500 cursor-pointer mt-4 text-center'>
                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </p>
            </div>
        </div>
    );
};

export default Auth;
