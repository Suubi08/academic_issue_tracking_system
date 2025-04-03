import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs"
import { Download, Eye, Filter, Plus, Search } from "lucide-react"

const Issuemanagement = () => {
  const issues = [
    {
      id: 1,
      title: "Assignment submission Error",
      category: "Technical",
      priority: "High",
      assignee: "Dr. Kalema",
      status: "Open",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "Assignment submission Error",
      category: "Administrative",
      priority: "Medium",
      assignee: "Dr. Nsamba",
      status: "In Progress",
      date: "2023-10-01",
    },
    {
      id: 3,
      title: "Exam Schedule Conflict",
      category: "Academic",
      priority: "High",
      assignee: "Dr. Williams",
      status: "Open",
      date: "2023-10-01",
    },
    {
      id: 4,
      title: "Missing Course Materials",
      category: "Content",
      priority: "Low",
      assignee: "Dr. Katongole",
      status: "Resolved",
      date: "2023-10-01",
    },
  ]

  return (
    <div className="p-6 bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Issue Management</h1>
        <div className="flex space-x-2">
          <button className="flex items-center border px-3 py-1 rounded-md border-gray-400" aria-label="Export Issues">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button
            className="border px-3 py-1 rounded-md border-gray-400 bg-black text-white flex items-center"
            aria-label="Create New Issue"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Issue
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div>
        <p className="text-gray-500 mb-4">
          View, assign, and track academic issues with filters and search functionality.
        </p>
        <div className="flex flex-row gap-4 mb-4 items-center">
          <div className="relative flex-grow">
            <Search className="text-gray-500 w-4 h-4 absolute left-2.5 top-2.5" aria-hidden="true" />
            <input
              type="search"
              className="border border-gray-500 pl-8 w-full rounded-md h-9"
              placeholder="Search issues by category, title, or assignee"
              aria-label="Search Issues"
            />
          </div>
          <button
            type="button"
            className="border px-3 border-gray-400 bg-white flex items-center rounded-md h-9"
            aria-label="Advanced Filter"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4 bg-indigo-50">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-black">
            All Issues
          </TabsTrigger>
          <TabsTrigger value="open" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Open
          </TabsTrigger>
          <TabsTrigger value="inprogress" className="data-[state=active]:bg-white data-[state=active]:text-black">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="resolved" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Resolved
          </TabsTrigger>
        </TabsList>

        {/* All Issues Tab Content */}
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Title</th>
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Priority</th>
                      <th className="text-left py-3 px-4 font-medium">Assignee</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">#{issue.id}</td>
                        <td className="py-3 px-4 border-b font-medium">{issue.title}</td>
                        <td className="py-3 px-4 border-b">{issue.category}</td>
                        <td className="py-3 px-4 border-b">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              issue.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : issue.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {issue.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b">{issue.assignee}</td>
                        <td className="py-3 px-4 border-b">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              issue.status === "open"
                                ? "bg-blue-100 text-blue-800"
                                : issue.status === "In Progress"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {issue.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b">{issue.date}</td>
                        <td className="py-3 px-4 border-b">
                          <button aria-label="View Issue Details">
                            <Eye className="h-4 w-4 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Issuemanagement

