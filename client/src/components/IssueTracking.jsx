import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const IssueTracking = () => {
  const issues = [
    { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "2", title: "Missing marks", status: "In Progress", lastUpdate: "Feb 15, 2025" },
    { id: "3", title: "Results error", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "4", title: "Software development issue", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "5", title: "Data structures", status: "Pending", lastUpdate: "Feb 15, 2028" },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-600";
      case "In Progress":
        return "bg-yellow-400";
      case "Pending":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusTime = (status) => {
    switch (status) {
      case "Resolved":
        return "10:30 - 13:30";
      case "In Progress":
        return "09:00 - 11:00";
      case "Pending":
        return "14:30 - 17:30";
      default:
        return "N/A";
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-semibold mb-4">Issue Tracking</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-start gap-4 p-4 border rounded-lg shadow-sm"
          >
            {/* Date Section */}
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg">
              <span className="text-lg font-semibold">28</span>
              <span className="text-sm text-gray-500">Wed</span>
            </div>

            {/* Issue Details */}
            <div className="flex-1">
              <h3 className="font-semibold">{issue.title}</h3>
              <p className="text-gray-500 text-sm">
                {getStatusTime(issue.status)} •{" "}
                <span className="text-gray-400">{issue.status.toLowerCase()}</span>
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
        ))}
      </CardContent>
    </Card>
  );
};

export default IssueTracking;
