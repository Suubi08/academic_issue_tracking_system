import { ArrowLeft, Bell, ChevronDown, Plus, User, Settings2 } from "lucide-react"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/Dropdown-menu"
import { useState, useEffect } from "react"

const PageHeader = ({
  title,
  description,
  showBackButton = false,
  showReportButton = false,
  showNotifications = true,
  backPath = "/studentdashboard",
}) => {
  const navigate = useNavigate()
  // Update the notification state to include a more robust system
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your issue has been updated", read: false, time: "10 minutes ago", type: "updates" },
    { id: 2, message: "New announcement from admin", read: false, time: "1 hour ago", type: "updates" },
    { id: 3, message: "Issue #1234 has been resolved", read: true, time: "Yesterday", type: "updates" },
    { id: 4, message: "Reminder: You have 2 pending issues", read: false, time: "2 hours ago", type: "reminders" },
  ])
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)

  // Add a function to add a new notification
  const addNotification = (message, type = "updates") => {
    const newNotification = {
      id: Date.now(),
      message,
      read: false,
      time: "Just now",
      type,
    }
    setNotifications([newNotification, ...notifications])
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

  // Add a test notification button (for demonstration)
  useEffect(() => {
    // This will add a notification when the component mounts
    const timer = setTimeout(() => {
      if (localStorage.getItem("demo-notification") !== "shown") {
        addNotification("Welcome back! You have new updates.")
        localStorage.setItem("demo-notification", "shown")
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Get notification settings from localStorage
  const getNotificationSettings = () => {
    try {
      const settings = JSON.parse(localStorage.getItem("notification-settings"))
      return settings || { email: true, browser: true, updates: true, reminders: true }
    } catch (e) {
      return { email: true, browser: true, updates: true, reminders: true }
    }
  }

  // Filter notifications based on settings
  const notificationSettings = getNotificationSettings()
  const filteredNotifications = notifications.filter((notification) => {
    if (notification.type === "updates" && !notificationSettings.updates) return false
    if (notification.type === "reminders" && !notificationSettings.reminders) return false
    return true
  })

  // Update the unread count to use filtered notifications
  const unreadCount = filteredNotifications.filter((n) => !n.read).length

  const handleBack = () => {
    navigate(backPath)
  }

  const handleReportIssue = () => {
    navigate("/issuereport")
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="bg-white border-b p-4 mb-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
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

        <div className="flex items-center space-x-4">
          {process.env.NODE_ENV !== "production" && (
            <Button variant="outline" size="sm" onClick={createTestNotification} className="mr-2">
              Test Notification
            </Button>
          )}
          {showReportButton && (
            <Button className="flex items-center gap-2" onClick={handleReportIssue}>
              <Plus className="h-4 w-4" />
              Report New Issue
            </Button>
          )}

          {showNotifications && (
            <DropdownMenu open={showNotificationDropdown} onOpenChange={setShowNotificationDropdown}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex justify-between items-center p-2 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600 h-auto p-1"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  ) : (
                    filteredNotifications.map((notification) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-600 w-full"
                    onClick={() => navigate("/settings")}
                  >
                    Notification Settings
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline-block">{localStorage.getItem("username") || "Profile"}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings2 className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default PageHeader

