"use client";

import { useState, useEffect } from "react";
import { Card, CardFooter } from "./ui/Card";
import axios from "axios";

const IssueTracking = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/issues/");
        setAllIssues(response.data);
        setIssues(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Function to get status styles based on the issue status
  const getStatusStyles = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800'; // example styles for open status
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'; // styles for in-progress
      case 'pending':
        return 'bg-red-100 text-red-800'; // styles for closed
      default:
        return 'bg-gray-100 text-gray-800'; // default styles
    }
  };

  return (
    <Card className="p-1 mt-4 shadow-md">
      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-lg">
                <span className="text-lg font-semibold">
                  {new Date(issue.date_of_issue).getDate()}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(issue.date_of_issue).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{issue.course_unit}</h3>
                <p className="text-sm text-gray-500">
                  Date of Issue: {issue.date_of_issue}
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
            </div>
          </div>
        ))}
      </div>

   
    </Card>
  );
};

export default IssueTracking;
