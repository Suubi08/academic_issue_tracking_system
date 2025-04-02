const IssueUpdates = ({ issues }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-800"
      case "Pending":
        return "bg-yellow-400"
      default:
        return "bg-red-800"
    }
  }

  const getStatusTime = (status) => {
    switch (status) {
      case "Resolved":
        return "Wed 10:30-13:30"
      case "In Progress":
        return "Thu 09:00-11:00"
      default:
        return "14:30-17:30"
    }
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
          <div className="flex flex-col">
            <span className="font-medium text-lg">{issue.title}</span>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-600">{getStatusTime(issue.status)}</span>
              <span
                className={`inline-flex items-center px-3 py-1 text-sm font-semibold text-white rounded-full ${getStatusStyles(
                  issue.status,
                )}`}
              >
                {issue.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default IssueUpdates

