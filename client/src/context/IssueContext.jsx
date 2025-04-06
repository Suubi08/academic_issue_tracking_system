
import { createContext, useContext, useState } from "react"

// Create context
const IssueContext = createContext(undefined)

// Sample data
const sampleIssues = [
  {
    id: "1",
    title: "Login Issue",
    description: "Unable to login to the student portal. The system shows an error message after entering credentials.",
    student: "John Doe",
    status: "Open",
    dateAssigned: "2024-06-25",
    lastUpdated: "2024-06-26",
    comments: [
      {
        author: "System",
        text: "Issue assigned to Lecturer",
        timestamp: "2024-06-25 09:30 AM",
      },
    ],
  },
  {
    id: "2",
    title: "Assignment Submission Error",
    description: "Cannot submit assignment due to a system error. The upload button is not working.",
    student: "Jane Smith",
    status: "In Progress",
    dateAssigned: "2024-06-24",
    lastUpdated: "2024-06-26",
    comments: [
      {
        author: "Lecturer",
        text: "I'm looking into this issue. Can you provide more details about the error message?",
        timestamp: "2024-06-25 02:15 PM",
      },
      {
        author: "Jane Smith",
        text: "The error says 'Server timeout'. I've attached a screenshot.",
        timestamp: "2024-06-25 03:20 PM",
        attachment: "error-screenshot.png",
      },
    ],
  },
  {
    id: "3",
    title: "Course Material Access",
    description: "Cannot access the course materials for CS101. The link shows a 404 error.",
    student: "Mike Johnson",
    status: "Resolved",
    dateAssigned: "2024-06-23",
    lastUpdated: "2024-06-25",
    comments: [
      {
        author: "Lecturer",
        text: "The link has been fixed. Please try accessing it again.",
        timestamp: "2024-06-24 11:45 AM",
      },
      {
        author: "Mike Johnson",
        text: "Thank you! I can access the materials now.",
        timestamp: "2024-06-24 12:30 PM",
      },
    ],
  },
  {
    id: "4",
    title: "Grade Discrepancy",
    description: "My midterm grade seems incorrect. I believe I scored higher than what's shown.",
    student: "Sarah Williams",
    status: "Open",
    dateAssigned: "2024-06-26",
    lastUpdated: "2024-06-26",
    comments: [],
  },
  {
    id: "5",
    title: "Video Playback Issue",
    description: "The lecture videos are not playing correctly. They stop after a few seconds.",
    student: "Alex Brown",
    status: "In Progress",
    dateAssigned: "2024-06-25",
    lastUpdated: "2024-06-26",
    comments: [
      {
        author: "Lecturer",
        text: "I'll check with the IT department about this issue.",
        timestamp: "2024-06-26 09:10 AM",
      },
    ],
  },
  {
    id: "6",
    title: "Login Issue",
    description: "Cannot login to the student portal after password reset.",
    student: "John Doe",
    status: "Open",
    dateAssigned: "2024-06-26",
    lastUpdated: "2024-06-26",
    comments: [],
  },
]

// Provider component
export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(sampleIssues)
  const [activeTab, setActiveTab] = useState("my-issues")

  // Filtered issues
  const pendingIssues = issues.filter((issue) => issue.status !== "Resolved")
  const resolvedIssues = issues.filter((issue) => issue.status === "Resolved")
  const newIssues = issues.filter((issue) => !issue.comments || issue.comments.length === 0)

  // Update issue status
  const updateIssueStatus = (id, status) => {
    const now = new Date().toISOString().split("T")[0]
    setIssues((prevIssues) =>
      prevIssues.map((issue) => (issue.id === id ? { ...issue, status, lastUpdated: now } : issue)),
    )
  }

  // Add comment to issue
  const addComment = (id, text, file) => {
    const now = new Date()
    const timestamp = now.toLocaleString()
    const formattedDate = now.toISOString().split("T")[0]

    const newComment = {
      author: "Lecturer",
      text,
      timestamp,
      attachment: file ? file.name : undefined,
    }

    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              comments: [...(issue.comments || []), newComment],
              lastUpdated: formattedDate,
            }
          : issue,
      ),
    )
  }

  return (
    <IssueContext.Provider
      value={{
        issues,
        pendingIssues,
        resolvedIssues,
        newIssues,
        activeTab,
        setActiveTab,
        updateIssueStatus,
        addComment,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}

// Custom hook to use the context
export const useIssueContext = () => {
  const context = useContext(IssueContext)
  if (context === undefined) {
    throw new Error("useIssueContext must be used within an IssueProvider")
  }
  return context
}

