import { useState } from "react";
import { AlertCircle, Bell, CheckCircle, Info, UserPlus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/Alert";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "Issue Assigned",
      description: "Issue #ISS-1002 has been assigned to Dr. Williams",
      timestamp: "Today at 10:30 AM",
      type: "info",
      read: false,
    },
    {
      id: "n2",
      title: "Issue Resolved",
      description: "Issue #ISS-1003 has been marked as resolved by Dr. Davis",
      timestamp: "Today at 9:15 AM",
      type: "success",
      read: false,
    },
    {
      id: "n3",
      title: "New Issue Created",
      description: "A new issue #ISS-1008 has been created by Olivia White",
      timestamp: "Yesterday at 3:45 PM",
      type: "info",
      read: true,
    },
    {
      id: "n4",
      title: "System Update",
      description: "The system will undergo maintenance tonight at 11:00 PM",
      timestamp: "Yesterday at 2:30 PM",
      type: "warning",
      read: true,
    },
    {
      id: "n5",
      title: "Login Attempt Failed",
      description:
        "Multiple failed login attempts detected from IP 192.168.1.45",
      timestamp: "2 days ago at 8:20 AM",
      type: "error",
      read: true,
    },
    {
      id: "n6",
      title: "New Lecturer Added",
      description: "Dr. Thompson has been added to the system",
      timestamp: "3 days ago at 11:10 AM",
      type: "success",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationAlert = (notification) => {
    let variant = "default";

    if (notification.type === "error") {
      variant = "destructive";
    }

    return (
      <Alert
        variant={variant}
        className={`mb-4 ${
          !notification.read ? "border-l-4 border-primary" : ""
        }`}
      >
        <div className="flex items-start">
          {getNotificationIcon(notification.type)}
          <div className="ml-3 flex-1">
            <AlertTitle className="text-sm font-medium">
              {notification.title}
            </AlertTitle>
            <AlertDescription className="text-sm">
              {notification.description}
              <div className="mt-1 text-xs text-muted-foreground">
                {notification.timestamp}
              </div>
            </AlertDescription>
          </div>
          {!notification.read && (
            <button
              onClick={() => markAsRead(notification.id)}
              className="text-xs text-primary hover:underline"
            >
              Mark as read
            </button>
          )}
        </div>
      </Alert>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Notifications & Alerts
        </h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="all">
                All
                <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {notifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                  {unreadCount}
                </span>
              </TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No notifications
                </p>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id}>
                    {getNotificationAlert(notification)}
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-4">
              {unreadCount === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No unread notifications
                </p>
              ) : (
                notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div key={notification.id}>
                      {getNotificationAlert(notification)}
                    </div>
                  ))
              )}
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              {notifications
                .filter((n) => n.type === "warning" || n.type === "error")
                .map((notification) => (
                  <div key={notification.id}>
                    {getNotificationAlert(notification)}
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
          <CardDescription>
            Issues recently assigned to lecturers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Issue #ISS-1002 assigned to Dr. Williams
                </p>
                <p className="text-xs text-muted-foreground">
                  Today at 10:30 AM
                </p>
                <p className="text-sm mt-1">Student: Sarah Johnson</p>
                <p className="text-sm">Type: Administrative</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Issue #ISS-1005 assigned to Dr. Martinez
                </p>
                <p className="text-xs text-muted-foreground">
                  Yesterday at 2:15 PM
                </p>
                <p className="text-sm mt-1">Student: David Lee</p>
                <p className="text-sm">Type: Administrative</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminNotifications;
