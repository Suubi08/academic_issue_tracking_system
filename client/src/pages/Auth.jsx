import React, { useState } from 'react'

const initialState = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "student", // Default role
    student_number: "",
    course_name: "",
    college: "",
    lecture_number: "",
    subjects_taught: "",
}

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [FormData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    }

  return (
    <div className='flex flex-col items-center content-center 
    justify-center align-center h-full p-5'>
        <h1 className='text-3xl font-bold mb-4 mt-12'>
            {isSignup ? "Sign UP" : "Sign in"}
        </h1>
        <form onSubmit={()=>{}}>
            <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                onChange={handleChange} 
                required 
            />

            {isSignup && <input 
                type='email'
                name='email'
                placeholder='Email'
                onChange={handleChange}
                required
            />}

            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
                required 
            />

            {isSignup && <input 
                type="password" 
                name="confirm_password" 
                placeholder="Confirm Password" 
                onChange={handleChange} 
                required 
            />}

            {isSignup && (
                <select name='role' onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="lecturer">Lecture</option>
                    <option value="admin">Administrator</option>
                </select>
            )}

            {isSignup && FormData.role === "student" && (
                <>
                    <input 
                        type='text'
                        name='student_number'
                        placeholder='Student Number'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='text'
                        name='course_name'
                        placeholder='Course_name'
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='text'
                        name='college'
                        placeholder='College Name'
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            {isSignup && FormData.role === "lecture" && (
                <>
                    <input 
                        type='text'
                        name='lecture_number'
                        placeholder='Lecture Number' 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type='text'
                        name='subjects_taught'
                        placeholder='Subjects Taught' 
                        onChange={handleChange} 
                        required
                    />
                </>
            )}

            {isSignup && FormData.role === "academic_registrar" && (
                <>
                    <input 
                        type='text'
                        name='department'
                        placeholder='Department'
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            <button type='submit'>{isSignup ? "Register" : "Login"}</button>
        </form>

        <p onClick={() => setIsSignup(!isSignup)} 
          className='text-blue-500 cursor-pointer mt-4'  >
            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
    </div>
  )
}

export default Auth