import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleNext = () => {
    if (role == "Student") {
      navigate("/student-info");
    } else if (role == "Lecturer" || role == "Administrator") {
      navigate("/dashboard");
    } else {
      alert("Please select a role!");
    }
  };

  return (
    <div className="container">
      <h1 className="welcome">Welcome, create your AITS account</h1>
      <div className="container2">
        <p className="log-p">It is our great pleasure to have you on board</p>

        <div>
          <label htmlFor="name" className="labels">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input-style"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="college" className="labels">
            College
          </label>
          <select id="college" className="input-style">
            <option value=""></option>
            <option value="CAES">
              College of Agriculture and Environmental Sciences
            </option>
            <option value="BAMS">
              College of Business and Management Sciences
            </option>
            <option value="COCIS">
              College of Computing and Information Sciences
            </option>
            <option value="CEES">
              College of Education and External Studies
            </option>
            <option value="CEDAT">
              College of Engineering, Design, Art, and Technology
            </option>
            <option value="CHS">College of Health Sciences</option>
            <option value="CHUSS">
              College of Humanities and Social Sciences
            </option>
            <option value="cns">College of Natural Sciences</option>
            <option value="covab">
              College of Veterinary Medicine, Animal Resources & Bio-security
            </option>
            <option value="law">The School of Law</option>
          </select>
        </div>
        <div>
          <label htmlFor="email" className="labels">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-style"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="pwd" className="labels">
            {" "}
            Password
          </label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            className="input-style"
            placeholder="Enter your Password"
          />
        </div>
        <div>
          <label htmlFor="pwd" className="labels">
            {" "}
            Confirm Password
          </label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            className="input-style"
            placeholder="Re-Enter Password"
          />
        </div>
        <div>
          <label htmlFor="role" className="labels">
            Role
          </label>
          <select
            id="role"
            className="input-style"
            value={role}
            onChange={handleRoleChange}
          >
            <option value=""></option>
            <option value="Student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="Admin">Administrator</option>
          </select>
        </div>
        <div>
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
