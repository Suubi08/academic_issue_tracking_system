"use client"

import { Calendar, FileText, FileTextIcon, MessageSquare } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"

const LecturerDashboard = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("role")

  useEffect(() => {
    // Ensure the user is a lecturer
    if (userRole !== "lecturer") {
      navigate("/login")
    }
  }, [userRole, navigate])

  const OverviewPanel = [
    {
      title: "Pending Issues",
      number: 12,
    },
    {
      title: "Resolved Issues",
      number: 8,
    },
    {
      title: "New Issues",
      number: 5,
    },
  ]
  const AssignedIssues = [
    {
      title1: "Missing marks",
      student: "John Doe",
      status: "pending",
      action: "View",
    },
    {
      title1: "Login Issue",
      student: "Kalema Joshua",
      status: "Resolved",
      action: "View",
    },
    {
      title1: "Missing marks",
      student: "John Doe",
      status: "Critical",
      action: "View",
    },
  ]
  const Updates = [
    {
      logo: MessageSquare,
      title: "New Issue reported by Alice",
      time: "10 minutes ago",
    },
    {
      logo: FileText,
      title: "New Issue, Server Down",
      time: "10 minutes ago",
    },
    {
      logo: Calendar,
      title: "Scheduled maintenance reminder",
      time: "10 minutes ago",
    },
  ]
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-4 ">
        {OverviewPanel.map((issue, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4 ">
              <FileTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500">{issue.title}</p>
              <h3 className="text-2xl font-bold">{issue.number}</h3>
            </div>
          </div>
        ))}
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Assigned Issues</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Student</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {AssignedIssues.map((issue, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{issue.title1}</td>
                  <td className="py-4 px-6">{issue.student}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        issue.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : issue.status === "Critical"
                            ? "bg-red-100 text-red-800"
                            : issue.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800" // Default case
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">{issue.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {Updates.map((status, index) => (
            <div key={index} className="flex items-start">
              <div className="rounded-full bg-blue-100 p-2 mr-4">
                {<status.logo className="w-6 h-6 text-blue-600" />}
              </div>
              <div>
                <p className="font-medium">{status.title}</p>
                <p className="text-sm text-gray-500">{status.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default LecturerDashboard

