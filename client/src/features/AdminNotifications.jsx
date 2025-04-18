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
  )
};
export default AdminNotifications;
