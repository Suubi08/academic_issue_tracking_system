import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { MessageSquare } from "lucide-react";
const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      message: "New comment on Issue #123",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "New comment on Issue #123",
      time: "2 minutes ago",
    },
    {
      id: 3,
      message: "New comment on Issue #123",
      time: "1 day ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
          <a href="#" className="text-sm text-blue-600 block mt-2">
            View All Comments
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
