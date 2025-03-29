"use client"

import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui"
import { Plus } from "lucide-react"

export default function Settings() {
    const [username] = useState("USERNAME")
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState({
      fullName: "John Doe",
      email: "john.doe@university.edu",
      studentId: "STD2024001",
      regNumber: "REG2024001",
      course: "Computer Science",
      year: "2024/2025",
      semester: "II",
      bio: "Computer Science student specializing in software development and data structures.",
      phone: "+1234567890",
      address: "123 University Avenue, Campus Housing",
    })
  
    const [notifications, setNotifications] = useState({
      email: true,
      browser: true,
      updates: false,
      reminders: true,
    })
  
    const handleProfileChange = (e) => {
      const { id, value } = e.target
      setProfileData((prev) => ({
        ...prev,
        [id]: value,
      }))
    }
  
    const handleNotificationChange = (key, value) => {
      setNotifications((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  
    const handleProfileSubmit = (e) => {
      e.preventDefault()
      console.log("Profile updated:", profileData)
      // Here you would typically send the data to your backend
      alert("Profile updated successfully!")
    }
  
    const handlePasswordSubmit = (e) => {
      e.preventDefault()
      // Password update logic would go here
      alert("Password updated successfully!")
    }
  
    // Function to handle report issue button click
    const handleReportIssue = () => {
      navigate("/report-issue")
    }
  
    return (
      <div className="flex h-screen bg-gray-50">
        <header>
            <div>
                <h1>
                    Settings & profile
                </h1>

            </div>
            <div className="flex items-center space-x-4">
                <Button className="flex items-center gap-2" variant='destructive' size='sm'>
                    <Plus className="h-4 w-4"/>
                    Report New Issue
                </Button>
            </div>
        </header>
  
           <main>


           </main>
        </div>
      
    )
  }
  
  