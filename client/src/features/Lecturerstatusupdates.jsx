import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Button } from "../components";
import { Badge } from "../components";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui";
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

const STATUS_COLORS = {
  pending: "#FBBF24", // yellow
  "in-progress": "#3B82F6", // blue
  resolved: "#10B981", // green
};

const Lecturerstatusupdates = () => {
  const [issues, setIssues] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("https://aitsh-47039bb03354.herokuapp.com/api/issues/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  // Status Distribution for PieChart
  const statusCounts = issues.reduce(
    (acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    },
    { pending: 0, "in-progress": 0, resolved: 0 }
  );
  const statusData = Object.keys(statusCounts).map((status) => ({
    name: status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    value: statusCounts[status],
    color: STATUS_COLORS[status],
  }));

  // Weekly Summary for BarChart (created vs resolved per day)
  const getDay = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, { weekday: "short" });
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d.toLocaleDateString(undefined, { weekday: "short" });
  });

  const weeklyCreated = {};
  const weeklyResolved = {};
  last7Days.forEach((day) => {
    weeklyCreated[day] = 0;
    weeklyResolved[day] = 0;
  });

  issues.forEach((issue) => {
    const createdDay = getDay(issue.created_at);
    if (weeklyCreated[createdDay] !== undefined) {
      weeklyCreated[createdDay]++;
    }
    if (
      issue.status === "resolved" &&
      weeklyResolved[createdDay] !== undefined
    ) {
      weeklyResolved[createdDay]++;
    }
  });

  const weeklyData = last7Days.map((day) => ({
    day,
    issues: weeklyCreated[day],
    resolved: weeklyResolved[day],
  }));

  // Status Updates Table
  const statusUpdates = issues
    .map((issue) => ({
      id: issue.id,
      issueId: issue.id,
      issueTitle: issue.title || issue.category || "Untitled",
      updateText: issue.description,
      timestamp: issue.created_at,
      status: issue.status,
    }))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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
                    <th className="h-12 px-4 text-left text-gray-500 font-medium">
                      Issue ID
                    </th>
                    <th className="h-12 px-4 text-left text-gray-500 font-medium">
                      Issue Title
                    </th>
                    <th className="h-12 px-4 text-left text-gray-500 font-medium">
                      Update
                    </th>
                    <th className="h-12 px-4 text-left text-gray-500 font-medium">
                      Timestamp
                    </th>
                    <th className="h-12 px-4 text-left text-gray-500 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUpdates.map((update) => (
                    <tr key={update.id} className="border-b">
                      <td className="p-4 text-gray-700 font-medium">
                        {update.issueId}
                      </td>
                      <td className="p-4 text-gray-700 font-medium">
                        {update.issueTitle}
                      </td>
                      <td className="max-w-md truncate p-4 text-gray-700 font-medium">
                        {update.updateText}
                      </td>
                      <td className="p-4 text-gray-700 font-medium">
                        {new Date(update.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(update.status)}>
                          {update.status.replace("-", " ")}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lecturerstatusupdates;
