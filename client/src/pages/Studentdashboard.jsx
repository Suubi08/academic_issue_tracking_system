import React, { useState } from 'react'
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import { FaSearch, FaCog, FaBell } from "react-icons/fa";
import { Calendar, IssueChart, Issuetable, IssueUpdates, ShowSlide, TrackStudentIssues, Side, UserInfoCard } from '../components'
import IssueTracking from '../components/IssueTracking'
const Studentdashboard = () => {
  const images = [
    image1,
    image2,
    image3,
  ];

  const [loading, setloading] = useState(false)
  const [user, setUser] = useState({
    username: "USERNAME",
    regNo: "REG NO",
    semester: "II",
    course: "Computer Science",
    year: "2024",
    profilePic: false,
  })
  const [issue, setIssue] = useState([
    { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "2", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "3", title: "missing marks", status: "In Progress", lastUpdate: "Feb 15, 2025" },
    { id: "4", title: "results error", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "5", title: "Software developnment issue", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "6", title: "data structures", status: "Pending", lastUpdate: "Feb 15, 2028" },
  ])

  const totalissues = issue.length
  const resolvedIssues = issue.filter((issue) => issue.status === "Resolved").length
  const inProgressIssues = issue.filter((issue) => issue.status === "In Progress").length
  const pendingIssues = issue.filter((issue) => issue.status === "Pending").length

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    <Side />

    {/* Main Content */}
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
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

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        {/* Left Side - Main Content */}
        <div className="md:col-span-2 space-y-4">
          <ShowSlide images={images} />
          <TrackStudentIssues />
          <IssueChart
            totalissues={totalissues}
            resolvedIssues={resolvedIssues}
            inProgressIssues={inProgressIssues}
            pendingIssues={pendingIssues}
          />
        </div>

        {/* Right Side - User Info, Calendar, and Tracking */}
        <div className="md:col-span-1 space-y-4">
          <UserInfoCard user={user} />
          <Calendar issues={issue} isLoading={loading} />
          <IssueTracking />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Studentdashboard;