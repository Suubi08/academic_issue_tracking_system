"use client"

mport { useState } from "react"
import { X, Paperclip, Send } from "lucide-react"
import { useIssueContext } from "../context/IssueContext"

const IssueDetails = ({ issue, isOpen, onClose }) => {
  const { addComment, updateIssueStatus } = useIssueContext()
  const [comment, setComment] = useState("")
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      adidComment(issue.id, comment, file)
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
