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
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };
  return(
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
          <Tabs  defaultValue="all">
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
          </Tabs>
        </CardContent>
      </Card>
  )
};
export default AdminNotifications;
