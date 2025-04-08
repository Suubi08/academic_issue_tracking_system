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
