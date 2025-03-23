import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle, Bell, MessageSquare, Users } from "lucide-react";

const Dashboard = () => {
  const summaryItems = [
    {
      title: "Active Issues",
      value: 8,
      description: "Across all categories",
      icon: AlertCircle,
      Color: "text-red-500",
      linkText: "View more",
    },
    {
      title: "Assigned Issues",
      value: "123",
      description: "To lecturers",
      icon: Users,
      Color: "text-blue-500",
      linkText: "View more",
    },
    {
      title: "Recent Comments",
      value: "45",
      description: "Last 24 hours",
      icon: MessageSquare,
      Color: "text-green-500",
      linkText: "View more",
    },
    {
      title: "Pending Notifications",
      value: "12",
      description: "Unread",
      icon: Bell,
      Color: "text-yellow-500",
      linkText: "View more",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map((items) => (
        <li>{items.title}</li>
      ))}
    </div>
  );
};

export default Dashboard;
