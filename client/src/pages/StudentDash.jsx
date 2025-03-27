import React from "react";
import { Side } from "../components";
import image2 from "../assets/2.jpg"
import { FaSearch, FaCog, FaBell } from "react-icons/fa";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const StudentDash = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Side />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md">
          <div>
            <h1 className="text-lg font-bold">USERNAME</h1>
            <p className="text-gray-500 text-sm">Tue, 27 June 2024</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border px-3 py-2 rounded-lg w-40 md:w-60"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
            <FaBell className="text-lg text-gray-600 cursor-pointer" />
            <FaCog className="text-lg text-gray-600 cursor-pointer" />
          </div>
        </header>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Left Column */}
          <div className="md:col-span-2">
            {/* Banner */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={image2}
                alt="AITS Banner"
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Issues Table */}
            <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
              <h2 className="font-bold text-lg mb-2">Issue Tracking</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-2 text-left">Issue Title</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Last Update</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: "Course registration error", status: "Pending", color: "text-red-500" },
                    { title: "Missing marks", status: "In Progress", color: "text-yellow-500" },
                    { title: "Results error", status: "Resolved", color: "text-green-500" },
                  ].map((issue, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{issue.title}</td>
                      <td className={`p-2 font-bold ${issue.color}`}>{issue.status}</td>
                      <td className="p-2">Feb 15, 2025</td>
                      <td className="p-2 text-blue-600 cursor-pointer">View</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statistics */}
            <div className="bg-white p-4 mt-4 rounded-lg shadow-md flex justify-around">
              <div>
                <p className="text-lg font-bold">Total Issues</p>
                <p className="text-3xl font-bold">10</p>
              </div>
              <div className="text-sm">
                <p className="text-green-500">✔ 6 Resolved</p>
                <p className="text-yellow-500">⌛ 3 In Progress</p>
                <p className="text-red-500">⚠ 1 Pending</p>
              </div>
            </div>
          </div>

          {/* Right Column - Profile & Calendar */}
          <aside className="bg-white p-4 rounded-lg shadow-md h-fit">
            <div className="flex items-center space-x-3">
              <img src="/avatar.png" alt="User" className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="font-bold text-md">WELCOME, USERNAME</h2>
                <p className="text-gray-500 text-xs">REG NO 📌</p>
              </div>
            </div>

            {/* Semester Info */}
            <div className="mt-3 bg-gray-200 p-3 rounded-lg">
              <p className="text-sm">SEMESTER: <span className="font-bold">II</span></p>
              <p className="text-sm">Course: <span className="font-bold">Computer Science</span></p>
              <p className="text-sm">Year: <span className="font-bold">2024</span></p>
            </div>

            {/* Calendar */}
            <div className="mt-4">
              <Calendar />
            </div>

            {/* Issue Tracking List */}
            <div className="mt-4">
              <h2 className="font-bold text-md">Issue Tracking</h2>
              <div className="mt-2 p-2 bg-gray-100 rounded-lg flex justify-between text-sm">
                <span>Software Development</span>
                <span className="text-red-500">Resolved</span>
              </div>
              <div className="mt-2 p-2 bg-gray-100 rounded-lg flex justify-between text-sm">
                <span>Data Structures</span>
                <span className="text-green-500">Pending</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StudentDash;
