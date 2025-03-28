import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/Tabs";
import { Download, Filter, Plus, Search } from "lucide-react";

const Issuemanagement = () => {
  const issues = [
    {
      id: 1,
      title: "Assignment submission Error",
      category: "Technical",
      priority: "High",
      assignee: "Dr. Kalema",
      status: "open",
      date: "2023-10-01",
      count: 2,
    },
    {
      id: 2,
      title: "Assignment submission Error",
      category: "Administrative",
      prioty: "Medium",
      assignee: "Dr. Nsamba",
      status: "in progress",
      date: "2023-10-01",
      count: 3,
    },
    {
      id: 3,
      title: "Exam Schedule conflict",
      category: "Academic",
      assignee: "Dr. Williams",
      status: "High",
      date: "2023-10-01",
      count: 5,
    },
    {
      id: 1,
      title: "Missing course materials",
      category: "content",
      assignee: "Dr. Katongole",
      status: "Resolved",
      date: "2023-10-01",
      count: 1,
    },
  ];
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Issue Management</h1>
        <div className="flex space-x-2">
          <button className=" flex items-center border px-3 py-1 rounded-md border-gray-400">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button className="border px-3 py-1 rounded-md border-gray-400 bg-black text-white flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create Issue
          </button>
        </div>
      </div>
      <div>
        <p className="text-gray-500 mb-4">
          View,assign, and track academic issues with filters and search
          functionallity
        </p>
        <div className="flex flex-row gap-4 mb-4 items-center">
          <div className="relative flex-grow">
            <Search className="text-gray-500 w-4 h-4 absolute left-2.5 top-2.5" />
            <input
              type="search"
              className="border border-gray-500 pl-8 w-full rounded-md h-9"
              placeholder="Search issues by category, title or assignee"
            />
          </div>
          <button
            type="button"
            className="border px-3 border-gray-400 bg-white flex items-center rounded-md h-9"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Issuemanagement;
