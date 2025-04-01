"use client"

import { useState, useEffect } from "react"
import { Menu, Search, Bell, User, Settings, ArrowLeft, Plus, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/Dropdown-menu"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { Input } from "./ui"

const Navbar = ({
  setSidebarOpen,
  sidebarOpen,
  title = "Dashboard",
  description = "",
  showBackButton = false,
  showReportButton = false,
}) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

  const getCurrentDate = () => {
    const date = new Date()
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    // You could implement global search functionality here
  }

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("role")
    localStorage.removeItem("username")

    // Redirect to login
    window.location.href = "/login"
  }

  const handleBack = () => {
    navigate("/studentdashboard")
  }

  const handleReportIssue = () => {
    navigate("/issuereport")
  }

  // Add a function to add a new notification
  const addNotification = (message, type = "updates") => {
    const newNotification = {
      id: Date.now(),
      message,
      read: false,
      time: "Just now",
      type,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  // Add a function to create a test notification
  const createTestNotification = () => {
    const types = ["updates", "reminders"]
    const messages = [
      "Your issue has been updated",
      "New announcement from admin",
      "Issue status changed to In Progress",
      "Reminder: You have pending issues",
      "New response to your issue",
    ]

    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    addNotification(randomMessage, randomType)
  }

  // Get notification settings and notifications
  useEffect(() => {
    try {
      // Load notification settings
      const settings = JSON.parse(localStorage.getItem("notification-settings")) || {
        email: true,
        browser: true,
        updates: true,
        reminders: true,
      }

      // This would normally come from an API
      const demoNotifications = [
        { id: 1, message: "Your issue has been updated", read: false, time: "10 minutes ago", type: "updates" },
        { id: 2, message: "New announcement from admin", read: false, time: "1 hour ago", type: "updates" },
        { id: 3, message: "Issue #1234 has been resolved", read: true, time: "Yesterday", type: "updates" },
        { id: 4, message: "Reminder: You have 2 pending issues", read: false, time: "2 hours ago", type: "reminders" },
      ]

      // Filter notifications based on settings
      const filteredNotifications = demoNotifications.filter((notification) => {
        if (notification.type === "updates" && !settings.updates) return false
        if (notification.type === "reminders" && !settings.reminders) return false
        return true
      })

      setNotifications(filteredNotifications)
      setUnreadCount(filteredNotifications.filter((n) => !n.read).length)

      // Add welcome notification
      setTimeout(() => {
        if (localStorage.getItem("demo-notification") !== "shown") {
          addNotification("Welcome back! You have new updates.")
          localStorage.setItem("demo-notification", "shown")
        }
      }, 3000)
    } catch (e) {
      console.error("Error loading notifications", e)
    }
  }, [])

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  return (
    <nav className="bg-white shadow-sm z-10 border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <button type="button" className="btn md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6 text-gray-400" />
            </button>

            <div className="flex items-center gap-4">
              {showBackButton && (
                <Button variant="ghost" className="gap-2" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold">{title}</h1>
                {description && <p className="text-sm text-gray-500">{description}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="max-w-xs w-full relative">
              <div className="relative w-64">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search here ..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={handleSearch}
                              />
                            </div>

            </div>

            {/* {process.env.NODE_ENV !== "production" && (
              <Button variant="outline" size="sm" onClick={createTestNotification}>
                Test
              </Button>
            )} */}

            {showReportButton && (
              <Button className="flex items-center gap-2" onClick={handleReportIssue}>
                <Plus className="h-4 w-4" />
                Report Issue
              </Button>
            )}

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
                  <div className="flex justify-between items-center p-2 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    {unreadCount > 0 && (
                      <button className="text-xs text-blue-600" onClick={markAllAsRead}>
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b last:border-b-0 ${notification.read ? "" : "bg-blue-50"} cursor-pointer`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex justify-between">
                            <p className={`text-sm ${notification.read ? "text-gray-700" : "font-medium"}`}>
                              {notification.message}
                            </p>
                            {!notification.read && <span className="h-2 w-2 bg-blue-600 rounded-full"></span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <button className="text-xs text-blue-600 w-full" onClick={() => navigate("/settings")}>
                      Notification Settings
                    </button>
                  </div>
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline-block">{localStorage.getItem("username") || "User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

