"use client"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Users, Clock, FileText, CheckCircle, AlertCircle, BarChart, ChevronRight, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LecturerDashboard = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username") || "Lecturer"

  // Mock data for the dashboard
  const issueStats = {
    total: 12,
    pending: 5,
    inProgress: 4,
    resolved: 3,
  }

  const recentIssues = [
    {
      id: 1,
      student: "John Smith",
      title: "Missing grade for CS101 Final Exam",
      course: "CS101: Introduction to Computer Science",
      status: "pending",
      date: "2023-04-01",
      priority: "high",
    },
    {
      id: 2,
      student: "Emily Johnson",
      title: "Request for deadline extension",
      course: "MATH202: Advanced Calculus",
      status: "in-progress",
      date: "2023-03-28",
      priority: "medium",
    },
    {
      id: 3,
      student: "Michael Brown",
      title: "Clarification on assignment requirements",
      course: "CS305: Database Systems",
      status: "resolved",
      date: "2023-03-15",
      priority: "low",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge>Normal</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}!</h1>
        <p className="text-gray-600 mt-2">Manage student academic issues and track their progress.</p>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => navigate("/issues")} className="flex items-center gap-2">
            <FileText size={18} />
            View All Issues
          </Button>
          <Button variant="outline" onClick={() => navigate("/reports")} className="flex items-center gap-2">
            <BarChart size={18} />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Issues</p>
              <h3 className="text-2xl font-bold text-blue-700">{issueStats.total}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border border-yellow-100">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-700">{issueStats.pending}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-purple-50 border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600">In Progress</p>
              <h3 className="text-2xl font-bold text-purple-700">{issueStats.inProgress}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Resolved</p>
              <h3 className="text-2xl font-bold text-green-700">{issueStats.resolved}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search issues..."
            />
          </div>
          <div className="flex gap-2">
            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="">All Courses</option>
              <option value="CS101">CS101</option>
              <option value="MATH202">MATH202</option>
              <option value="CS305">CS305</option>
            </select>
            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Recent issues */}
      <Card className="overflow-hidden">
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Issues</h2>
            <Button variant="outline" onClick={() => navigate("/issues")} className="text-sm">
              View All
            </Button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentIssues.map((issue) => (
            <div key={issue.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{issue.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Student: {issue.student}</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{issue.course}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(issue.status)}
                  {getPriorityBadge(issue.priority)}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-500">Submitted: {new Date(issue.date).toLocaleDateString()}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => navigate(`/issues?id=${issue.id}`)}
                >
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start" onClick={() => navigate("/issues")}>
            <FileText className="h-5 w-5 mr-2" />
            Manage Issues
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => navigate("/reports")}>
            <BarChart className="h-5 w-5 mr-2" />
            View Reports
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => navigate("/settings")}>
            <CheckCircle className="h-5 w-5 mr-2" />
            Account Settings
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default LecturerDashboard

