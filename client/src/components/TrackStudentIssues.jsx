import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components";
import { Eye, Filter, Search } from "lucide-react";

const TrackStudentIssues = () => {
  const [issues] = useState([
    { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "2025-02-15" },
    { id: "2", title: "Course registration error", status: "Pending", lastUpdate: "2025-02-15" },
    { id: "3", title: "Missing marks", status: "In Progress", lastUpdate: "2025-02-15" },
    { id: "4", title: "Results error", status: "Resolved", lastUpdate: "2025-02-15" },
    { id: "5", title: "Software development issue", status: "Resolved", lastUpdate: "2025-02-15" },
    { id: "6", title: "Data structures", status: "Pending", lastUpdate: "2025-02-18" },
  ]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Issue Filtering</CardTitle>
          <div className="flex space-x-2">
            <div className="relative w-40">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search issues"
                className="pl-8 h-8 w-full border border-gray-200 rounded-md text-sm"
              />
            </div>
            <button className="h-8 flex items-center px-3 border border-gray-200 rounded-md text-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {issues.map((issue) => (
          <div key={issue.id} className="flex justify-between p-2 border border-gray-200 rounded-md text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex flex-col items-center justify-center bg-gray-100 rounded-lg text-xs">
                <span className="font-semibold">{new Date(issue.lastUpdate).getDate()}</span>
                <span className="text-gray-500">{new Date(issue.lastUpdate).toLocaleDateString("en-US", { weekday: "short" })}</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">{issue.title}</h3>
                <p className="text-xs text-gray-500">Updated: {issue.lastUpdate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(issue.status)}`}>
                {issue.status}
              </span>
              <button className="flex items-center px-2 border border-gray-200 rounded-md text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrackStudentIssues;
