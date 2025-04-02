"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "../components"
import { Eye, Filter, Search, X, ChevronDown } from "lucide-react"
import { Button } from "./ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/Dropdown-menu"

const TrackStudentIssues = () => {
  // Sample data
  const allIssues = [
    { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "2", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "3", title: "Missing marks", status: "In Progress", lastUpdate: "Feb 15, 2025" },
    { id: "4", title: "Results error", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "5", title: "Software development issue", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "6", title: "Data structures", status: "Pending", lastUpdate: "Feb 15, 2028" },
  ]

  const [issues, setIssues] = useState(allIssues)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Apply filters when search term, status filter, or sort changes
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

    // Apply sorting
    filteredIssues.sort((a, b) => {
      const dateA = new Date(a.lastUpdate)
      const dateB = new Date(b.lastUpdate)

      if (sortBy === "newest") {
        return dateB - dateA
      } else if (sortBy === "oldest") {
        return dateA - dateB
      }
      return 0
    })

    setIssues(filteredIssues)
  }, [searchTerm, statusFilter, sortBy])

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setSortBy("newest")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (statusFilter !== "all") count++
    if (sortBy !== "newest") count++
    return count
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Issue Tracking</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search issues"
                className="pl-8 h-9 md:w-[200px] lg:w-[250px] border border-gray-200 rounded-md"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={handleFilterToggle}
              className={`h-9 flex items-center px-3 border rounded-md ${
                showFilters || getActiveFiltersCount() > 0
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "border-gray-200"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {getActiveFiltersCount() > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 flex items-center px-3 border border-gray-200 rounded-md">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Sort
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange("newest")}>
                  {sortBy === "newest" && "✓ "}Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("oldest")}>
                  {sortBy === "oldest" && "✓ "}Oldest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="mt-4 p-3 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Filter by Status</h3>
              <button onClick={clearFilters} className="text-xs text-blue-600 flex items-center">
                Clear all <X className="h-3 w-3 ml-1" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilter("all")}
                className={`px-3 py-1 text-xs rounded-full ${
                  statusFilter === "all"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleStatusFilter("Pending")}
                className={`px-3 py-1 text-xs rounded-full ${
                  statusFilter === "Pending"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusFilter("In Progress")}
                className={`px-3 py-1 text-xs rounded-full ${
                  statusFilter === "In Progress"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusFilter("Resolved")}
                className={`px-3 py-1 text-xs rounded-full ${
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
          <div className="text-center py-8">
            <p className="text-gray-500">No issues found matching your filters.</p>
            <button onClick={clearFilters} className="mt-2 text-blue-600 text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg">
                    <span className="text-lg font-semibold">{new Date(issue.lastUpdate).getDate()}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(issue.lastUpdate).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{issue.title}</h3>
                    <p className="text-sm text-gray-500">Last updated: {issue.lastUpdate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(issue.status)}`}>
                    {issue.status}
                  </span>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {issues.length > 0 && (
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-gray-500">
            Showing {issues.length} of {allIssues.length} issues
          </div>
          {(searchTerm || statusFilter !== "all" || sortBy !== "newest") && (
            <button onClick={clearFilters} className="text-sm text-blue-600">
              Clear filters
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

export default TrackStudentIssues

