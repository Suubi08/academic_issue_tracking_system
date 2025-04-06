"use client"

import { useState } from "react"
import { X, Paperclip, Send } from "lucide-react"
import { useIssueContext } from "../context/IssueContext"

const IssueDetails = ({ issue, isOpen, onClose }) => {
  const { addComment, updateIssueStatus } = useIssueContext()
  const [comment, setComment] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      addComment(issue.id, comment, file)
      setComment("")
      setFile(null)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative h-full w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl md:h-auto md:max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">{issue.title}</h2>
          <button onClick={onClose} className="rounded-md p-1 text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(100%-8rem)] flex-col md:flex-row">
          {/* Issue details */}
          <div className="w-full border-b p-4 md:w-1/2 md:border-b-0 md:border-r">
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-gray-500">Issue Details</h3>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">ID:</span>
                  <span className="ml-2 text-sm text-gray-700">#{issue.id}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">Student:</span>
                  <span className="ml-2 text-sm text-gray-700">{issue.student}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">Date Assigned:</span>
                  <span className="ml-2 text-sm text-gray-700">{issue.dateAssigned}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                  <span className="ml-2 text-sm text-gray-700">{issue.lastUpdated}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <select
                    value={issue.status}
                    onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                    className="ml-2 rounded-md border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-500">Description</h3>
              <p className="text-sm text-gray-700">{issue.description}</p>
            </div>
          </div>

          {/* Comments section */}
          <div className="flex h-full w-full flex-col md:w-1/2">
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="mb-3 text-sm font-medium text-gray-500">Discussion Thread</h3>
              {issue.comments && issue.comments.length > 0 ? (
                <div className="space-y-4">
                  {issue.comments.map((comment, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                      {comment.attachment && (
                        <div className="mt-2 flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs text-blue-600">
                          <Paperclip className="mr-1 h-3 w-3" />
                          <span>{comment.attachment}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-gray-500">No comments yet</p>
              )}
            </div>

            {/* Comment form */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="min-h-[80px] w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
                    <Paperclip className="mr-1 h-4 w-4" />
                    <span>{file ? file.name : "Attach File"}</span>
                    <input type="file" onChange={handleFileChange} className="hidden" />
                  </label>
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="mr-1 h-4 w-4" />
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetails

