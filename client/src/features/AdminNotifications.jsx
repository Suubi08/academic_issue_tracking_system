import {useState} from "react"
import {Card,CardContent,CardHeader, CardTitle} from "../components"
import {Button} from "../components/ui/button"
import { Bell, CheckCircle, Clock, AlertCircle, Filter } from "lucide-react"
const AdminNotifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Issue assigned to Dr.kalema",
      description: "Assignment submission error",
      time: "10 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 2,
      title: "New Issue assigned to Dr.kalema",
      description: "Assignment submission error",
      time: "10 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 3,
      title: "New Issue assigned to Dr.kalema",
      description: "Assignment submission error",
      time: "10 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 4,
      title: "Issue resolved",
      description: "Missing course materials",
      time: "1 day ago",
      read: true,
      type: "resolution",
    },
    {
      id: 5,
      title: "New Issue assigned to Dr.kalema",
      description: "System will be down for maintainance",
      time: "2 days ago",
      read: true,
      type: "system",
    },
  ];
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
  );
};

export default AdminNotifications;
