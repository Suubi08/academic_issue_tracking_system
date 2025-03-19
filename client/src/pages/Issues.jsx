import React from "react";

const Issues = () => {
  return (
    <div className="bg-white shadow-lg  h-screen px-30 py-10">
      <div>
        <h1>Report Issue</h1>
      </div>
      <form action="">
        <div>
          <p>Personal Details:</p>
          <div className="flex flex-col">
            <div className="flex justify-between mt-2">
              <div class="mb-5">
                <label for="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  class="input_style"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="std_no">Student Number</label>
                <input
                  type="text"
                  id="std_no"
                  placeholder="Enter your student_no"
                  className="input_style"
                />
              </div>
              <div>
                <label htmlFor="reg">Registration Number</label>
                <input
                  type="text"
                  id="reg"
                  placeholder="Enter your reg_no"
                  className="input_style"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Issue Details</p>
          <div className="flex justify-between mt-2">
            <div>
              <label htmlFor="issue_id">Issue ID</label>
              <input
                type="number"
                id="issue_id"
                placeholder="1009"
                className="input_style"
              />
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
              <label htmlFor="date">Date of Issue</label>
              <input
                type="date"
                id="date"
                placeholder="Enter your name"
                className="input_style"
              />
            </div>
          </div>

          <div className="flex justify-between mt-2">
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
          </div>
          <div>
            <label htmlFor="description">Issue Description</label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <div className="flex justify-between mt-2 ">
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
        </div>
      </form>
    </div>
  );
};

export default Issues;
