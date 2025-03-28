import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Tab, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Eye, Filter, Search } from "lucide-react";

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
  return <div></div>;
};

export default Issuemanagement;
