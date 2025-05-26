import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, Bell, CheckCircle, Info, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
} from "../components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/Alert";

const RegistrarNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://aitsh-47039bb03354.herokuapp.com/api/notifications/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

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
              {notification.message || notification.description}
              <div className="mt-1 text-xs text-muted-foreground">
                {new Date(notification.timestamp).toLocaleString()}
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
    </div>
  );
};

export default RegistrarNotifications;
