import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function StudInfo() {
    const navigate = useNavigate();

    const [studentNumber, setStudentNumber] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");  // ✅ Single state for year
    const [semester, setSemester] = useState("");  // ✅ Single state for semester

    const handleSubmit = (event) => {
        event.preventDefault(); // ✅ Prevents page reload
        console.log("Student Info Submitted!"); // ✅ Debugging
        console.log("Navigating to Dashboard...");
        navigate('/dashboard'); // ✅ Navigate to Dashboard after submission
    };

    return (
        <div className='container'>
            <h1 className='welcome'>Welcome, create your AITS account</h1>
            <div className="container2">
                <form onSubmit={handleSubmit}>
                    <p className='log-p'>It is our great pleasure to have you on board!</p>

                    <div>
                        <label htmlFor="std_no" className='labels'>Student Number</label>
                        <input 
                            type="text" 
                            name="std_no" 
                            id="std_no"  
                            className='input-style' 
                            placeholder='Enter your Student number' 
                            value={studentNumber} 
                            onChange={(e) => setStudentNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="reg_no" className='labels'>Registration Number</label>
                        <input 
                            type="text" 
                            name="reg_no" 
                            id="reg_no"  
                            className='input-style' 
                            placeholder='Enter your Reg number' 
                            value={registrationNumber} 
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="course" className='labels'>Course</label>
                        <input 
                            type="text" 
                            name="course" 
                            id="course"  
                            className='input-style' 
                            placeholder='Enter your course' 
                            value={course} 
                            onChange={(e) => setCourse(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="semester" className='labels'>Semester</label>
                        <select 
                            id="semester" 
                            className='input-style' 
                            value={semester} 
                            onChange={(e) => setSemester(e.target.value)}
                            required
                        >
                            <option value="">Select Semester</option>
                            <option value="Semester 1">Semester 1</option>
                            <option value="Semester 2">Semester 2</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="year" className='labels'>Year</label>
                        <select 
                            id="year" 
                            className='input-style' 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="Year 1">Year 1</option>
                            <option value="Year 2">Year 2</option>
                            <option value="Year 3">Year 3</option>
                            <option value="Year 4">Year 4</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="btn">Register</button>
                    </div>

                    <div>
                        <p className='log-p'>
                            Already have an Account? <Link to="/Login">Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudInfo;
