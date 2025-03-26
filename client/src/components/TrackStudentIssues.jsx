import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Eye, Filter, Search } from "lucide-react";

const TrackStudentIssues = () => {
  const [issues, setIssues] = useState([
    { id: "1", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "2", title: "Course registration error", status: "Pending", lastUpdate: "Feb 15, 2025" },
    { id: "3", title: "Missing marks", status: "In Progress", lastUpdate: "Feb 15, 2025" },
    { id: "4", title: "Results error", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "5", title: "Software development issue", status: "Resolved", lastUpdate: "Feb 15, 2025" },
    { id: "6", title: "Data structures", status: "Pending", lastUpdate: "Feb 15, 2028" },
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
    <Card className="">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle>Issue Filtering</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search issues"
                className="pl-8 h-9 md:w-[200px] lg:w-[250px] border border-gray-200 rounded-md"
              />
            </div>
            <button
              variant="outline"
              size="sm"
              className="h-9 flex items-center px-3 border border-gray-200 rounded-md"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="flex justify-between p-3 border border-gray-200 rounded-md"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg">
                  <span className="text-lg font-semibold">
                    {new Date(issue.lastUpdate).getDate()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(issue.lastUpdate).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{issue.title}</h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {issue.lastUpdate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                    issue.status
                  )}`}
                >
                  {issue.status}
                </span>
                <button
                  variant="outline"
                  size="sm"
                  className="flex items-center px-3 border border-gray-200 rounded-md"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackStudentIssues;