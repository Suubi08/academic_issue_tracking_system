import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, Clock, AlertCircle, Filter } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch notifications from backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications")  // Replace with your backend URL
        const data = await response.json()
        setNotifications(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  if (loading) {
    return <div>Loading...</div>  // Show a loading indicator while data is being fetched
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications & Alerts</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Mute All
          </Button>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-500 mb-4">
          Receive updates on your assigned issues. Stay informed about new assignments, comments, and status changes.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Filter:</span>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            All Types
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-blue-600">{notifications.filter((n) => !n.read).length}</span> unread
          notifications
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        {/* All Notifications Tab */}
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-blue-50 border-blue-100"}`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full mr-4 ${
                          notification.type === "assignment"
                            ? "bg-purple-100 text-purple-600"
                            : notification.type === "reminder"
                            ? "bg-yellow-100 text-yellow-600"
                            : notification.type === "comment"
                            ? "bg-green-100 text-green-600"
                            : notification.type === "resolution"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {notification.type === "assignment" ? (
                          <Bell className="h-5 w-5" />
                        ) : notification.type === "reminder" ? (
                          <Clock className="h-5 w-5" />
                        ) : notification.type === "comment" ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : notification.type === "resolution" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unread Notifications Tab */}
        <TabsContent value="unread" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => !n.read).length > 0 ? (
                  notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div key={notification.id} className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                        <div className="flex items-start">
                          <div className="p-2 rounded-full mr-4 bg-blue-100 text-blue-600">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark as read
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-500">You have no unread notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignment Notifications Tab */}
        <TabsContent value="assignments" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => n.type === "assignment").length > 0 ? (
                  notifications
                    .filter((n) => n.type === "assignment")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-blue-50 border-blue-100"}`}
                      >
                        <div className="flex items-start">
                          <div className="p-2 rounded-full mr-4 bg-purple-100 text-purple-600">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No assignment notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reminder Notifications Tab */}
        <TabsContent value="reminders" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Reminder Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => n.type === "reminder").length > 0 ? (
                  notifications
                    .filter((n) => n.type === "reminder")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-blue-50 border-blue-100"}`}
                      >
                        <div className="flex items-start">
                          <div className="p-2 rounded-full mr-4 bg-yellow-100 text-yellow-600">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reminder notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
