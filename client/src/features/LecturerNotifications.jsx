import { useState, useEffect, useMemo } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Button } from "../components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LecturerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("You are not logged in. Please log in again.");
        navigate("/login");
        return;
      }
      try {
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
        toast.error("Failed to fetch notifications. Please try again later.");
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const filteredNotifications = useMemo(() => {
    return activeTab === "all"
      ? notifications
      : activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === activeTab);
  }, [notifications, activeTab]);

  const markAsRead = async (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await axios.patch(
        `http://localhost:8000/api/notifications/${id}/`,
        { read: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success("Notification marked as read!");
    } catch (error) {
      toast.error("Failed to update notification status.");
    }
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.info("Notification deleted.");
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>
            Stay updated with important alerts and messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            className="mb-4"
            onValueChange={setActiveTab}
          >
            <TabsList className="rounded-lg p-1 flex">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="warning">Warnings</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No notifications to display
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg flex items-start gap-4 ${
                        !notification.read ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3
                            className={`font-medium ${
                              !notification.read ? "font-semibold" : ""
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto mt-2 text-indigo-600"
                            onClick={async () => {
                              await markAsRead(notification.id);
                              setNotifications((prev) =>
                                prev.filter((n) => n.id !== notification.id)
                              );
                              if (notification.id) {
                                navigate(
                                  `/lecturer-notification-details/${notification.id}`
                                );
                              } else {
                                toast.error("Notification ID is missing");
                              }
                            }}
                          >
                            View Issue
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
    </div>
  );
};

export default LecturerNotifications;
