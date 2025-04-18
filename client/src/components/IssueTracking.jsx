import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Search, Filter, X } from "lucide-react"

const IssueTracking = () => {
  const allIssues = [
    {
      id: "1",
      title: "Software development issue",
      status: "Resolved",
      time: "10:30 - 13:30",
      day: "28",
      weekday: "Wed",
    },
    {
      id: "2",
      title: "Data structures",
      status: "Pending",
      time: "14:30 - 17:30",
      day: "28",
      weekday: "Wed",
    },
    {
      id: "3",
      title: "Missing marks",
      status: "In Progress",
      time: "09:00 - 11:00",
      day: "29",
      weekday: "Thu",
    },
    {
      id: "4",
      title: "Course registration",
      status: "Pending",
      time: "13:00 - 15:00",
      day: "30",
      weekday: "Fri",
    },
  ]

  const [issues, setIssues] = useState(allIssues)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filteredIssues = [...allIssues]

    // Apply search filter
    if (searchTerm) {
      filteredIssues = filteredIssues.filter((issue) => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredIssues = filteredIssues.filter((issue) => issue.status === statusFilter)
    }

    setIssues(filteredIssues)
  }, [searchTerm, statusFilter])

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500 text-white"
      case "Pending":
        return "bg-yellow-500 text-white"
      case "In Progress":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
  }

  return (
    <Card className="p-1 mt-4 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Issue Tracking
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1.5 h-3 w-3 text-gray-500" />
              <input
                type="search"
                placeholder="Search"
                className="pl-7 h-7 w-[120px] text-xs border border-gray-200 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-7 flex items-center px-2 text-xs border rounded-md ${
                showFilters || statusFilter !== "all" ? "bg-blue-50 border-blue-200 text-blue-600" : "border-gray-200"
              }`}
            >
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50 text-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Filter by Status</span>
              <button onClick={clearFilters} className="text-xs text-blue-600 flex items-center">
                Clear <X className="h-3 w-3 ml-1" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  statusFilter === "all"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("Pending")}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  statusFilter === "Pending"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("In Progress")}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  statusFilter === "In Progress"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setStatusFilter("Resolved")}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  statusFilter === "Resolved"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">No issues found matching your filters.</p>
            <button onClick={clearFilters} className="mt-1 text-blue-600 text-xs">
              Clear filters
            </button>
          </div>
        ) : (
          issues.map((issue, index) => (
            <div key={issue.id}>
              <div className="flex items-start gap-4 py-3">
                {/* Date Section */}
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg">
                  <span className="text-lg font-semibold">{issue.day}</span>
                  <span className="text-sm text-gray-500">{issue.weekday}</span>
                </div>

                {/* Issue Details */}
                <div className="flex-1">
                  <h3 className="font-semibold">{issue.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {issue.time} • <span className="text-gray-400">{issue.status.toLowerCase()}</span>
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-white text-xs font-semibold px-2 py-1 rounded-lg ${getStatusStyles(issue.status)}`}
                >
                  {issue.status}
                </span>
              </div>

              {/* Divider Line (Only show for all except the last item) */}
              {index < issues.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))
        )}

        {issues.length > 0 && issues.length < allIssues.length && (
          <div className="text-center mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Showing {issues.length} of {allIssues.length} issues
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default IssueTracking

