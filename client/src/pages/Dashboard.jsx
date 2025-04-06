import { Card, CardHeader, CardTitle, CardContent } from "../components";
import { AlertCircle, Bell, MessageSquare, Users } from "lucide-react";
import QuickActions from "./QuickActions";
import IssueTracking from "./IssueTracking";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  const summaryItems = [
    {
      title: "Active Issues",
      value: "8",
      description: "Across all categories",
      icon: AlertCircle,
      color: "text-red-500",
      linkText: "View more",
    },
    {
      title: "Assigned Issues",
      value: "123",
      description: "To lecturers",
      icon: Users,
      color: "text-blue-500",
      linkText: "View more",
    },
    {
      title: "Recent Comments",
      value: "45",
      description: "Last 24 hours",
      icon: MessageSquare,
      color: "text-green-500",
      linkText: "View more",
    },
    {
      title: "Pending Notifications",
      value: "12",
      description: "Unread",
      icon: Bell,
      color: "text-yellow-500",
      linkText: "View more",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map((items) => (
          <Card key={items.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-md">{items.title}</CardTitle>
              <items.icon className={`h-5 w-5 ${items.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.value}</div>
              <p className="text-xs text-muted-foreground text-gray-400">
                {items.description}
              </p>
              <a className="text-xs text-blue-600 mt-2 block" href="#">
                {items.linkText}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-4">
          <IssueTracking />
        </div>
        <div className="mt-4 lg:col-span-1 space-y-4">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
