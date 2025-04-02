"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "./ui/Card"
import { Button } from "./ui/Button"

const Issuetable = ({ issue: initialIssues }) => {
  const [issues, setIssues] = useState(initialIssues || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filteredIssues = [...initialIssues]

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

      if (sortOrder === "newest") {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    })

    setIssues(filteredIssues)
  }, [initialIssues, searchTerm, statusFilter, sortOrder])

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setSortOrder("newest")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (statusFilter !== "all") count++
    if (sortOrder !== "newest") count++
    return count
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <CardTitle>My Issues</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search issues"
                className="pl-8 h-9 w-[180px] border border-gray-200 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`${showFilters || statusFilter !== "all" ? "bg-blue-50 border-blue-200 text-blue-600" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filter
              {getActiveFiltersCount() > 0 && (
                <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            >
              <ChevronDown
                className={`h-4 w-4 mr-1 transition-transform ${sortOrder === "oldest" ? "rotate-180" : ""}`}
              />
              {sortOrder === "newest" ? "Newest" : "Oldest"}
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="p-3 border border-gray-200 rounded-md bg-gray-50 mt-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Filter by Status</h3>
              <button onClick={clearFilters} className="text-xs text-blue-600 flex items-center">
                Clear all <X className="h-3 w-3 ml-1" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1 text-xs rounded-full ${
                  statusFilter === "all"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("Pending")}
                className={`px-3 py-1 text-xs rounded-full ${
                  statusFilter === "Pending"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("In Progress")}
                className={`px-3 py-1 text-xs rounded-full ${
                  statusFilter === "In Progress"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setStatusFilter("Resolved")}
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-800 dark:divide-gray-700">
              <thead className="bg-blue-700 dark:bg-gray:700 text-white">
                <tr>
                  <th className="cellheader">ISSUE TITLE</th>
                  <th className="cellheader">STATUS</th>
                  <th className="cellheader">LAST UPDATE</th>
                  <th className="cellheader">ACTION</th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-gray-800 divide-y divide-blue-800 dark:divide-gray-700">
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-6 whitespace-nowrap">{issue.title}</td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          issue.status === "Resolved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : issue.status === "In Progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-yellow-200"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-sm text-black font-bold">{issue.lastUpdate}</td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <button className="view">view</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {issues.length > 0 && (
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-gray-500">
            Showing {issues.length} of {initialIssues.length} issues
          </div>
          {getActiveFiltersCount() > 0 && (
            <button onClick={clearFilters} className="text-sm text-blue-600">
              Clear filters
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

export default Issuetable

