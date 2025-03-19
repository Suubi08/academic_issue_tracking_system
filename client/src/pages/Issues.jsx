import React from "react";

const Issues = () => {
  return (
    <div className="bg-gray-100   h-screen px-30 py-10">
      <div>
        <h1>Report Issue</h1>
      </div>
      <form action="">
        <div>
          <p>Personal Details:</p>
          <div className="flex flex-col">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your name"
                className="input_style"
              />
            </div>
            <div>
              <label htmlFor="reg" className="block mb-2">
                Registration Number
              </label>
              <input
                type="text"
                id="reg"
                placeholder="Enter your reg_no"
                className="input_style"
              />
            </div>
            <div>
              <label htmlFor="std_no" className="block mb-2">
                Student Number
              </label>
              <input
                type="text"
                id="std_no"
                placeholder="Enter your student_no"
                className="input_style"
              />
            </div>
          </div>
        </div>
        <div>
          <p>Issue Details</p>
          <div className="flex justify-between">
            <div>
              <label htmlFor="issue_id" className="block mb-2">
                Issue ID
              </label>
              <input
                type="number"
                id="issue_id"
                placeholder="1009"
                className="input_style"
              />
            </div>
            <div>
              <label htmlFor="date" className="block mb-2">
                Date of Issue
              </label>
              <input
                type="date"
                id="date"
                placeholder="Enter your name"
                className="input_style"
              />
            </div>
          </div>
          <div>
            <label htmlFor="category">Issue Category</label>
            <select className="input_style">
              <option value="">Select Issue</option>
              <option value="marks">Missing marks</option>
              <option value="appeals">Appeals</option>
              <option value="Corrections">Corrections</option>
            </select>
          </div>
          <div>
            <label htmlFor="course">Course Unit</label>
            <select className="input_style">
              <option value="">select course unit</option>
              <option value="OS">Operating Systems</option>
              <option value="DSA">Data Structures and Algorithms</option>
              <option value="SAD">System Analysis and Design</option>
              <option value="SD">Software Development</option>
              <option value="PS">Probability and Statistics</option>
            </select>
          </div>
          <div>
            <label htmlFor="lecturer">Lecturer</label>
            <input
              type="search"
              id="lecturer"
              placeholder="search lecturer"
              className="input_style"
            />
          </div>
          <div>
            <label htmlFor="description">Issue Description</label>
            <textarea
              name="description"
              id="description"
              className="input_style"
            ></textarea>
          </div>
          <div>
            <label htmlFor="fileUpload">Attachment</label>
            <input
              type="file"
              id="fileUpload"
              //   placeholder="Enter your name"
              className="input_style"
            />
          </div>
          <div>
            <label htmlFor="year">Year of Study</label>
            <select className="input_style">
              <option value="student"></option>
              <option value="">2025/2026</option>
              <option value="">2024/2025</option>
              <option value="">2023/2024</option>
              <option value="r">2022/2023</option>
              <option value="r">2021/2022</option>
            </select>
          </div>
          <div>
            <label htmlFor="semester">Semester</label>
            <select className="input_style">
              <option value="student"></option>
              <option value="">Semester one</option>
              <option value="">Semester Two</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Issues;
