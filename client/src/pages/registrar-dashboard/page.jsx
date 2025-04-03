"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../../components"
import { Button } from "../../components"
import { Badge } from "../../components/ui/Badge"
import { Filter, Search, AlertCircle, CheckCircle, Clock, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { useToast } from "../../components/ui/use-toast"

export default function RegistrarDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

  // Mock data for issues
  const [issues, setIssues] = useState([
    {
      id: "ISSUE-001",
      title: "Missing marks for CS101 Final Exam",
      department: "Computer Science",
      assignedTo: "",
      status: "Pending",
      priority: "High",
      student: "John Smith",
      dateSubmitted: "2025-03-28",
      escalated: false,
      description: "I cannot see my final exam marks for CS101 course. I took the exam on March 15th.",
    },
    {
      id: "ISSUE-002",
      title: "Course registration error",
      department: "Academic Affairs",
      assignedTo: "Dr. Johnson",
      status: "In Progress",
      priority: "Medium",
      student: "Emily Davis",
      dateSubmitted: "2025-03-25",
      escalated: false,
      description: "I'm unable to register for MATH202 even though I've completed all prerequisites.",
    },
    {
      id: "ISSUE-003",
      title: "Transcript discrepancy",
      department: "Records Office",
      assignedTo: "Ms. Williams",
      status: "Resolved",
      priority: "Medium",
      student: "Michael Brown",
      dateSubmitted: "2025-03-20",
      escalated: false,
      description: "My transcript is missing credits for ENG101 which I completed last semester.",
    },
    {
      id: "ISSUE-004",
      title: "Scholarship application issue",
      department: "",
      assignedTo: "",
      status: "Pending",
      priority: "High",
      student: "Sarah Wilson",
      dateSubmitted: "2025-03-27",
      escalated: true,
      description: "My scholarship application was rejected but I meet all the criteria. Need urgent review.",
    },
    {
      id: "ISSUE-005",
      title: "Graduation status verification",
      department: "Records Office",
      assignedTo: "Ms. Williams",
      status: "In Progress",
      priority: "High",
      student: "David Miller",
      dateSubmitted: "2025-03-26",
      escalated: true,
      description: "I need verification of my graduation status for a job application due next week.",
    },
    {
      id: "ISSUE-006",
      title: "Course material access problem",
      department: "IT Department",
      assignedTo: "Mr. Thompson",
      status: "Resolved",
      priority: "Low",
      student: "Jennifer Lee",
      dateSubmitted: "2025-03-15",
      escalated: false,
      description: "Cannot access course materials for BIO201 on the learning portal.",
    },
  ])

  // Mock data for departments
  const departments = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Academic Affairs" },
    { id: 3, name: "Records Office" },
    { id: 4, name: "IT Department" },
    { id: 5, name: "Finance Office" },
    { id: 6, name: "Student Affairs" },
  ]

  // Mock data for staff members
  const staffMembers = [
    { id: 1, name: "Dr. Johnson", department: "Academic Affairs" },
    { id: 2, name: "Ms. Williams", department: "Records Office" },
    { id: 3, name: "Mr. Thompson", department: "IT Department" },
    { id: 4, name: "Dr. Martinez", department: "Computer Science" },
    { id: 5, name: "Ms. Anderson", department: "Finance Office" },
    { id: 6, name: "Mr. Taylor", department: "Student Affairs" },
  ]

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("role")
    const storedUsername = localStorage.getItem("username")

    // if (!token || role !== "academic_registrar") {
    //   navigate("/login")
    //   return
    // }

    setUsername(storedUsername || "Academic Registrar")
    setLoading(false)

    // Show welcome toast
    toast({
      title: "Welcome back!",
      description: "You're now viewing your academic registrar dashboard.",
      duration: 3000,
    })
  }, [navigate, toast])

  // Filter issues based on search term, status, department, and priority
  const filteredIssues = issues.filter((issue) => {
    // Filter by search term
    if (
      searchTerm &&
      !issue.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !issue.student.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && issue.status !== statusFilter) {
      return false
    }

    // Filter by department
    if (departmentFilter !== "all" && issue.department !== departmentFilter) {
      return false
    }

    // Filter by priority
    if (priorityFilter !== "all" && issue.priority !== priorityFilter) {
      return false
    }

    // Filter by tab
    if (activeTab === "escalated" && !issue.escalated) {
      return false
    } else if (activeTab === "unassigned" && issue.assignedTo) {
      return false
    } else if (activeTab === "assigned" && !issue.assignedTo) {
      return false
    }

    return true
  })

  // Calculate statistics
  const totalIssues = issues.length
  const pendingIssues = issues.filter((issue) => issue.status === "Pending").length
  const inProgressIssues = issues.filter((issue) => issue.status === "In Progress").length
  const resolvedIssues = issues.filter((issue) => issue.status === "Resolved").length
  const escalatedIssues = issues.filter((issue) => issue.escalated).length
  const unassignedIssues = issues.filter((issue) => !issue.assignedTo).length

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setDepartmentFilter("all")
    setPriorityFilter("all")
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "Resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const handleAssignIssue = (issue) => {
    setSelectedIssue(issue)
    setIsAssignModalOpen(true)
  }

  const handleAssignSubmit = (department, staff) => {
    // Update the issue with assignment details
    const updatedIssues = issues.map((issue) => {
      if (issue.id === selectedIssue.id) {
        return {
          ...issue,
          department,
          assignedTo: staff,
          status: "In Progress",
        }
      }
      return issue
    })

    setIssues(updatedIssues)
    setIsAssignModalOpen(false)
    setSelectedIssue(null)

    toast({
      title: "Issue assigned successfully",
      description: `Issue ${selectedIssue.id} has been assigned to ${staff} in ${department}.`,
      duration: 3000,
    })
  }

  const handleUpdateStatus = (issueId, newStatus) => {
    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        return {
          ...issue,
          status: newStatus,
        }
      }
      return issue
    })

    setIssues(updatedIssues)

    toast({
      title: "Status updated",
      description: `Issue status has been updated to ${newStatus}.`,
      duration: 3000,
    })
  }

  const handleResolveEscalation = (issueId) => {
    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        return {
          ...issue,
          escalated: false,
          status: "Resolved",
        }
      }
      return issue
    })

    setIssues(updatedIssues)

    toast({
      title: "Escalation resolved",
      description: "The escalated issue has been resolved successfully.",
      duration: 3000,
    })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}!</h1>
        <p className="text-gray-600 mt-2">Manage and oversee all academic issues in the system.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <div className="text-2xl font-bold mt-1">{totalIssues}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <div className="text-2xl font-bold mt-1">{pendingIssues}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <div className="text-2xl font-bold mt-1">{inProgressIssues}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <div className="text-2xl font-bold mt-1">{resolvedIssues}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Escalated</p>
                <div className="text-2xl font-bold mt-1">{escalatedIssues}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Unassigned</p>
                <div className="text-2xl font-bold mt-1">{unassignedIssues}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issue Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Issue Management</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search issues or students"
                  className="pl-8 h-9 md:w-[250px] border border-gray-200 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Filters</h3>
                <button onClick={clearFilters} className="text-xs text-blue-600">
                  Clear all filters
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium block mb-1">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">Department</label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">Priority</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Issues</TabsTrigger>
              <TabsTrigger value="escalated">Escalated</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
            </TabsList>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIssues.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                        No issues found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredIssues.map((issue) => (
                      <tr key={issue.id} className={issue.escalated ? "bg-red-50" : ""}>
                        <td className="px-4 py-4 whitespace-nowrap">{issue.id}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            {issue.escalated && (
                              <span className="mr-2 flex-shrink-0 h-2 w-2 rounded-full bg-red-500"></span>
                            )}
                            {issue.title}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">{issue.student}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(issue.status)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{getPriorityBadge(issue.priority)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{issue.department || "—"}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{issue.assignedTo || "—"}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {!issue.assignedTo && (
                              <Button size="sm" variant="outline" onClick={() => handleAssignIssue(issue)}>
                                Assign
                              </Button>
                            )}
                            {issue.escalated && (
                              <Button size="sm" variant="outline" onClick={() => handleResolveEscalation(issue.id)}>
                                Resolve
                              </Button>
                            )}
                            {issue.status !== "Resolved" && (
                              <Select
                                onValueChange={(value) => handleUpdateStatus(issue.id, value)}
                                defaultValue={issue.status}
                              >
                                <SelectTrigger className="h-8 w-[130px]">
                                  <SelectValue placeholder="Update Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="In Progress">In Progress</SelectItem>
                                  <SelectItem value="Resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Assignment Modal */}
      {isAssignModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Assign Issue</h2>
            <p className="mb-4">
              Assign issue <strong>{selectedIssue.id}</strong>: {selectedIssue.title}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Staff Member</label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Staff Member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.name}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAssignSubmit("Computer Science", "Dr. Martinez")}>Assign</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

