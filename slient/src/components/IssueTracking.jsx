import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const IssueTracking = () => {
  const issues = [
    {
      id: "1",
      title: "Software development issue",
      status: "Resolved",
      time: "10:30 - 13:30",
      day: "28",
      weekday: "Wed",
    },
    {
      id: "2",
      title: "Data structures",
      status: "Pending",
      time: "14:30 - 17:30",
      day: "28",
      weekday: "Wed",
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-red-500";
      case "Pending":
        return "bg-green-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card className="p-1 mt-4">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-semibold mb-4">Issue Tracking</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {issues.map((issue, index) => (
          <div key={issue.id}>
            <div className="flex items-start gap-4 py-3">
              {/* Date Section */}
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg">
                <span className="text-lg font-semibold">{issue.day}</span>
                <span className="text-sm text-gray-500">{issue.weekday}</span>
              </div>

              {/* Issue Details */}
              <div className="flex-1">
                <h3 className="font-semibold">{issue.title}</h3>
                <p className="text-gray-500 text-sm">
                  {issue.time} •{" "}
                  <span className="text-gray-400">
                    {issue.status.toLowerCase()}
                  </span>
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`text-white text-xs font-semibold px-2 py-1 rounded-lg ${getStatusStyles(
                  issue.status
                )}`}
              >
                {issue.status}
              </span>
            </div>

            {/* Divider Line (Only show for all except the last item) */}
            {index < issues.length - 1 && <hr className="border-gray-200" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IssueTracking;
