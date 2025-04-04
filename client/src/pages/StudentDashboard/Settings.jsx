"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Textarea } from "../../components/ui/Textarea"
import { Switch } from "../../components/ui/Switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Lock, LogOut, Save, UserCircle } from "lucide-react"

export default function Settings() {
  const [profileData, setProfileData] = useState({
    fullName: localStorage.getItem("username") || "John Doe",
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
    browser: false,
    updates: true,
    reminders: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [profileSuccess, setProfileSuccess] = useState("")

  const handleProfileChange = (e) => {
    const { id, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { id, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    console.log("Profile updated:", profileData)

    // Update username in localStorage
    localStorage.setItem("username", profileData.fullName)

    // Show success message
    setProfileSuccess("Profile updated successfully!")
    setTimeout(() => setProfileSuccess(""), 3000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    // In a real app, you would send this data to your API
    console.log("Password updated")

    // Show success message and reset form
    setPasswordSuccess("Password changed successfully!")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setTimeout(() => setPasswordSuccess(""), 3000)
  }

  const handleNotificationChange = (type, checked) => {
    setNotifications((prev) => {
      const updated = {
        ...prev,
        [type]: checked,
      }

      // Save to localStorage
      localStorage.setItem("notification-settings", JSON.stringify(updated))

      return updated
    })
  }

  // Load notification settings from localStorage on component mount
  useEffect(() => {
    try {
      const savedSettings = JSON.parse(localStorage.getItem("notification-settings"))
      if (savedSettings) {
        setNotifications(savedSettings)
      }
    } catch (e) {
      console.error("Error loading notification settings", e)
    }
  }, [])

  return (
    <div>
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
                {profileSuccess && (
                  <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-md text-sm">{profileSuccess}</div>
                )}
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
                      <Select value={profileData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Academic Year</Label>
                      <Select value={profileData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024/2025">2024/2025</SelectItem>
                          <SelectItem value="2023/2024">2023/2024</SelectItem>
                          <SelectItem value="2022/2023">2022/2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={profileData.semester}
                        onValueChange={(value) => handleSelectChange("semester", value)}
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

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                {passwordError && (
                  <div className="mb-4 p-2 bg-red-50 text-red-700 rounded-md text-sm">{passwordError}</div>
                )}
                {passwordSuccess && (
                  <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-md text-sm">{passwordSuccess}</div>
                )}
                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-6">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Language Preference</h3>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive" className="w-full" onClick={() => (window.location.href = "/login")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    id="browser-notifications"
                    checked={notifications.browser}
                    onCheckedChange={(checked) => handleNotificationChange("browser", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Notification Types</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="updates-notifications">Issue Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when your issues are updated</p>
                  </div>
                  <Switch
                    id="updates-notifications"
                    checked={notifications.updates}
                    onCheckedChange={(checked) => handleNotificationChange("updates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders-notifications">Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminders about pending issues</p>
                  </div>
                  <Switch
                    id="reminders-notifications"
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => handleNotificationChange("reminders", checked)}
                  />
                </div>
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => {
                  localStorage.setItem("notification-settings", JSON.stringify(notifications))
                  alert("Notification preferences saved successfully!")
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

