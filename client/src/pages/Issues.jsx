import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Eye, Filter, Search } from "lucide-react";

const Issues = () => {
  const issues = [
    {
      id: 1,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 2,
    },
    {
      id: 2,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 1,
    },
    {
      id: 3,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 5,
    },
    {
      id: 4,
      title: "Assignment submission Error",
      category: "Technical",
      assignee: "Dr. Smith",
      status: "open",
      count: 3,
    },
  ];
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Issue Tracking</CardTitle>
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
          <div key={issue.id}>
            <div>
              <div>{issue.count}</div>
              <div>
                <h3>{issue.title}</h3>
                <p>
                  {issue.category}
                  <span>.</span>
                  Assigned:{issue.assignee}
                </p>
              </div>
            </div>
            <div>
              <span>{issue.status}</span>
              <button>
                <Eye />
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

export default Issues;
