export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Format date to display in a readable format
export function formatDate(date) {
  if (!date) return ""

  const d = new Date(date)
  if (isNaN(d.getTime())) return date // Return original if invalid

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Get status color based on status string
export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "resolved":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        solid: "bg-green-500",
      }
    case "in progress":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        solid: "bg-yellow-500",
      }
    case "pending":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        solid: "bg-red-500",
      }
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        solid: "bg-gray-500",
      }
  }
}

// Sort issues by date
export function sortIssuesByDate(issues, order = "desc") {
  return [...issues].sort((a, b) => {
    const dateA = new Date(a.lastUpdate)
    const dateB = new Date(b.lastUpdate)

    return order === "desc" ? dateB - dateA : dateA - dateB
  })
}

// Filter issues by search term
export function filterIssuesBySearchTerm(issues, searchTerm) {
  if (!searchTerm) return issues

  const term = searchTerm.toLowerCase()
  return issues.filter((issue) => issue.title.toLowerCase().includes(term) || issue.status.toLowerCase().includes(term))
}

// Filter issues by status
export function filterIssuesByStatus(issues, status) {
  if (!status || status === "all") return issues

  return issues.filter((issue) => issue.status === status)
}

