"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"

const Lecturerissuemanagement = () => {
  const mockIssues = [
    {
      id: "ISSUE-001",
      title: "Assignment submission error",
      course: "Computer Science 101",
      student: "John Smith",
      dateSubmitted: "2025-03-28",
      status: "pending",
      priority: "high",
    },
    {
      id: "ISSUE-002",
      title: "Grade discrepancy",
      course: "Data Structures",
      student: "Emma Johnson",
      dateSubmitted: "2025-03-27",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "ISSUE-003",
      title: "Course material access problem",
      course: "Algorithms",
      student: "Michael Brown",
      dateSubmitted: "2025-03-25",
      status: "resolved",
      priority: "low",
    },
    {
      id: "ISSUE-004",
      title: "Quiz timing issue",
      course: "Computer Science 101",
      student: "Sarah Davis",
      dateSubmitted: "2025-03-29",
      status: "pending",
      priority: "high",
    },
    {
      id: "ISSUE-005",
      title: "Missing lecture notes",
      course: "Web Development",
      student: "David Wilson",
      dateSubmitted: "2025-03-26",
      status: "in-progress",
      priority: "medium",
    },
  ]
  const [issues] = useState(mockIssues)
  const [activeTab, setActiveTab] = useState("all")
  const filteredIssues = activeTab === "all" ? issues : issues.filter((issue) => issue.status === activeTab)
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white"
      case "in-progress":
        return "bg-blue-500 text-white"
      case "resolved":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-orange-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div>
      <Card className="max-h-[500px] overflow-y-auto border">
        <CardHeader>
          <CardTitle>Assigned Issues</CardTitle>
          <CardDescription>Manage and Track student Issues assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">ID</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Title</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Course</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Student</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Date Submitted</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Priority</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr class="border-b" key={issue.id}>
                  <td class="p-4 align-middle font-medium">{issue.id}</td>
                  <td class="p-4 align-middle">{issue.title}</td>
                  <td class="p-4 align-middle">{issue.course}</td>
                  <td class="p-4 align-middle">{issue.student}</td>
                  <td class="p-4 align-middle">{new Date(issue.dateSubmitted).toLocaleDateString()}</td>
                  <td className="p-4 align-middle">
                    <Badge className={`px-2 py-1 ${getStatusColor(issue.status)}`}>
                      {issue.status.replace("-", " ")}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                  </td>
                  <td class="p-4 align-middle">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Issues</CardTitle>
            <CardDescription>Issues awaiting your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{issues.filter((i) => i.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>Issues you're currently working on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{issues.filter((i) => i.status === "in-progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
            <CardDescription>Issues you've successfully resolved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{issues.filter((i) => i.status === "resolved").length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Lecturerissuemanagement

