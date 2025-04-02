"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import Button from "../components/ui/Button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs"
import { cn } from "../utilis/utils"

const mockNotifications = [
  {
    id: "n1",
    title: "New Issue Assigned",
    message: "You have been assigned a new issue: 'Assignment submission error'",
    timestamp: "2025-03-31T09:30:00",
    read: false,
    type: "info",
  },
  {
    id: "n2",
    title: "Issue Deadline Approaching",
    message: "The issue 'Grade discrepancy' needs to be resolved within 24 hours",
    timestamp: "2025-03-31T08:15:00",
    read: false,
    type: "warning",
  },
  {
    id: "n3",
    title: "Issue Resolved",
    message: "The issue 'Course material access problem' has been marked as resolved",
    timestamp: "2025-03-30T14:45:00",
    read: true,
    type: "success",
  },
  {
    id: "n4",
    title: "Student Message",
    message: "You have received a new message from student Sarah Davis regarding Quiz timing issue",
    timestamp: "2025-03-30T11:20:00",
    read: true,
    type: "info",
  },
  {
    id: "n5",
    title: "System Maintenance",
    message: "The system will be under maintenance on April 2nd from 2:00 AM to 4:00 AM",
    timestamp: "2025-03-29T16:00:00",
    read: true,
    type: "warning",
  },
]

const LecturerNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab)

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Notifications & Alerts
        </h2>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div> */}

      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>Stay updated with important alerts and messages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4 " onValueChange={setActiveTab}>
            <TabsList className=" rounded-lg p-1 flex">
              <TabsTrigger
                value="all"
                className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md"
              >
                Info
              </TabsTrigger>
              <TabsTrigger
                value="warning"
                className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md"
              >
                Warnings
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className="px-4 py-2 text-sm font-medium rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md"
              >
                Success
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No notifications to display</div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn("p-4 border rounded-lg flex items-start gap-4", !notification.read && "bg-gray-50")}
                    >
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={cn("font-medium", !notification.read && "font-semibold")}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        {!notification.read && (
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto mt-2 text-indigo-600"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Unread Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{notifications.filter((n) => !n.read).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{notifications.filter((n) => n.type === "warning").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default LecturerNotifications

