

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Button } from "../components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui";
import { Badge } from "../components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const mockStatusUpdates = [
  {
    id: "su1",
    issueId: "ISSUE-001",
    issueTitle: "Assignment submission error",
    updateText:
      "Investigating the submission error. Initial analysis shows it might be related to server timeout.",
    timestamp: "2025-03-30T14:30:00",
    status: "in-progress",
  },
  {
    id: "su2",
    issueId: "ISSUE-002",
    issueTitle: "Grade discrepancy",
    updateText:
      "Reviewing the grading criteria and student submission to identify any discrepancies.",
    timestamp: "2025-03-29T11:15:00",
    status: "in-progress",
  },
  {
    id: "su3",
    issueId: "ISSUE-003",
    issueTitle: "Course material access problem",
    updateText:
      "Issue resolved. Student now has proper access to all course materials.",
    timestamp: "2025-03-28T16:45:00",
    status: "resolved",
  },
  {
    id: "su4",
    issueId: "ISSUE-004",
    issueTitle: "Quiz timing issue",
    updateText: "Awaiting IT department response on the quiz timer bug.",
    timestamp: "2025-03-31T09:20:00",
    status: "pending",
  },
  {
    id: "su5",
    issueId: "ISSUE-005",
    issueTitle: "Missing lecture notes",
    updateText:
      "Located the missing lecture notes and uploaded them to the course page.",
    timestamp: "2025-03-30T10:00:00",
    status: "in-progress",
  },
];

const statusData = [
  { name: "Pending", value: 2, color: "#FBBF24" },
  { name: "In Progress", value: 2, color: "#3B82F6" },
  { name: "Resolved", value: 1, color: "#10B981" },
];

const weeklyData = [
  { day: "Mon", issues: 3, resolved: 1 },
  { day: "Tue", issues: 5, resolved: 2 },
  { day: "Wed", issues: 2, resolved: 1 },
  { day: "Thu", issues: 4, resolved: 3 },
  { day: "Fri", issues: 3, resolved: 2 },
  { day: "Sat", issues: 1, resolved: 1 },
  { day: "Sun", issues: 0, resolved: 0 },
];

const Lecturerstatusupdates = () => {
  const [statusUpdates] = useState(mockStatusUpdates);
  const [activeTab, setActiveTab] = useState("all");

  const filteredUpdates =
    activeTab === "all"
      ? statusUpdates
      : statusUpdates.filter((update) => update.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Status Updates and Resolutions
        </h2>
        <Button size="sm">Add Update</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Status Distribution</CardTitle>
            <CardDescription>
              Current status of all assigned issues
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Issue Tracking</CardTitle>
            <CardDescription>
              Issues created vs resolved this week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="issues" name="New Issues" fill="#3B82F6" />
                <Bar dataKey="resolved" name="Resolved" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Status Updates</CardTitle>
          <CardDescription>
            Track the progress of issue resolutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Updates</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Issue ID
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Issue Title
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Update
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Timestamp
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Status
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                {filteredUpdates.map((update) => (
                  <tr key={update.id} className="border-b">
                    <th className="p-4 align-middle   font-medium text-gray-700 ">
                      {update.issueId}
                    </th>
                    <th className="p-4 align-middle text-gray-700 font-medium">
                      {update.issueTitle}
                    </th>
                    <th className="max-w-md truncate p-4 align-middle text-gray-700 font-medium">
                      {update.updateText}
                    </th>
                    <th className="p-4 align-middle text-gray-700 font-medium ">
                      {new Date(update.timestamp).toLocaleString()}
                    </th>
                    <th className="p-4 align-middle  text-gray-700">
                      <Badge className={getStatusColor(update.status)}>
                        {update.status.replace("-", " ")}
                      </Badge>
                    </th>
                    <th className="p-4 align-middle text-gray-700 font-medium">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </th>
                  </tr>
                ))}
              </table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
export default Lecturerstatusupdates;
