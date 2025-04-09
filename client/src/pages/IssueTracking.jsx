import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Eye, Filter, Search } from "lucide-react"
const IssueTracking = () => {
  const issues = [
    {
      id: 1,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 2,
    },
    {
      id: 2,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 1,
    },
    {
      id: 3,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 5,
    },
    {
      id: 4,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 3,
    },
  ]
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Issue Tracking</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search issues"
                className="pl-8 h-9 md:w-[200px] lg:w-[250px] border border-gray-200 rounded-md"
              />
            </div>
            <button
              variant="outline"
              size="sm"
              className="h-9 flex items-center px-3 border border-gray-200 rounded-md"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="flex justify-between p-3 border-2 border-gray-200 rounded-md">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-sm">
                  {issue.count}
                </div>
                <div>
                  <h3 className="font-medium">{issue.title}</h3>
                  <p className="text-sm text-gray-500">
                    {issue.category}
                    <span>.</span>
                    Assigned:{issue.assignee}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {issue.status}
                </span>
                <button
                  variant="outline"
                  size="sm"
                  className="flex items-center px-3 border border-gray-200 rounded-md"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default IssueTracking

