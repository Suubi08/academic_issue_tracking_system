

import { useState } from "react"
import { Bell, ChevronDown, Lock, LogOut, Plus, Save, SettingsIcon, User, UserCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/"
import { Button } from "../../components/ui/"
import { Input } from "../../components/ui/"
import { Label } from "../../components/ui/"
import { Textarea } from "../../components/ui/"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/"
import { Switch } from "../../components/ui/"

import { useNavigate } from "react-router-dom"


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
    alert("Profile updated successfully!")
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    alert("Password updated successfully!")
  }

  const handleReportIssue = () => {
    navigate("/report-issue")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
  

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Settings & Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="flex items-center gap-2" onClick={handleReportIssue}>
                <Plus className="h-4 w-4" />
                Report New Issue
              </Button>
              <span className="text-sm text-muted-foreground hidden md:inline-block">Tue, 27 June 2024</span>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    Profile
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg" alt={profileData.fullName} />
                      <AvatarFallback className="text-2xl">{profileData.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium">{profileData.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                    <div className="w-full mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Student ID</span>
                        <span className="text-sm font-medium">{profileData.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Registration</span>
                        <span className="text-sm font-medium">{profileData.regNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Course</span>
                        <span className="text-sm font-medium">{profileData.course}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Academic Year</span>
                        <span className="text-sm font-medium">{profileData.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Semester</span>
                        <span className="text-sm font-medium">{profileData.semester}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Change Profile Picture
                    </Button>
                  </CardFooter>
                </Card>

                {/* Edit Profile Form */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" value={profileData.fullName} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={profileData.email} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={profileData.phone} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" value={profileData.address} onChange={handleProfileChange} />
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" rows={4} value={profileData.bio} onChange={handleProfileChange} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="course">Course</Label>
                          <Select
                            value={profileData.course}
                            onValueChange={(value) => setProfileData((prev) => ({ ...prev, course: value }))}
                          >
                            <SelectTrigger id="course">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                              <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                              <SelectItem value="Data Science">Data Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Select
                            value={profileData.year}
                            onValueChange={(value) => setProfileData((prev) => ({ ...prev, year: value }))}
                          >
                            <SelectTrigger id="year">
                              <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024/2025">2024/2025</SelectItem>
                              <SelectItem value="2025/2026">2025/2026</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester</Label>
                          <Select
                            value={profileData.semester}
                            onValueChange={(value) => setProfileData((prev) => ({ ...prev, semester: value }))}
                          >
                            <SelectTrigger id="semester">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I">Semester I</SelectItem>
                              <SelectItem value="II">Semester II</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Other tabs for Account and Notifications can be added similarly */}
          </Tabs>
        </main>
      </div>
    </div>
  )
}
