import { Calendar, FileText, FileTextIcon, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosInstance";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components";
import axios from "axios";

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const userRole = localStorage.getItem("role");
  const lecturerId = localStorage.getItem("id"); // Get the logged-in lecturer's ID from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("issues/");
        console.log(response.data); // Debugging the

        // Filter issues for the logged-in lecturer
        const myIssues = response.data.filter(
          (issue) => issue.assigned_to?.id.toString() === lecturerId
        );

        setIssues(myIssues);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lecturerId]); // Dependency array ensures the effect runs when lecturerId changes

  useEffect(() => {
    // Ensure the user is a lecturer
    if (userRole !== "lecturer") {
      navigate("/login");
    }
  }, [userRole, navigate]);

  const OverviewPanel = [
    {
      title: "Pending Issues",
      number: issues.filter((issue) => issue.status === "pending").length,
    },
    {
      title: "In progress Issues",
      number: issues.filter((issue) => issue.status === "in_progress").length,
    },
    {
      title: "Resolved Issues",
      number: issues.filter((issue) => issue.status === "resolved").length,
    },
    {
      title: "Total Issues",
      number: issues.length,
    },
  ];

  const AssignedIssues = issues.map((issue) => ({
    title: issue.category,
    student: `${issue.created_by?.first_name} ${issue.created_by?.last_name}`,
    status: issue.status,
    action: "View",
  }));

  const Updates = [
    {
      logo: MessageSquare,
      title: "New Issue reported by Alice",
      time: "10 minutes ago",
    },
    {
      logo: FileText,
      title: "New Issue, Server Down",
      time: "10 minutes ago",
    },
    {
      logo: Calendar,
      title: "Scheduled maintenance reminder",
      time: "10 minutes ago",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-4">
        {OverviewPanel.map((issue, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 flex items-center"
          >
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FileTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500">{issue.title}</p>
              <h3 className="text-2xl font-bold">{issue.number}</h3>
            </div>
          </div>
        ))}
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Assigned Issues</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Student</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {AssignedIssues.map((issue, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">{issue.title}</td>
                  <td className="py-4 px-6">{issue.student}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        issue.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : issue.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : issue.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800" // Default case
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                      {issue.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {Updates.map((status, index) => (
            <div key={index} className="flex items-start">
              <div className="rounded-full bg-blue-100 p-2 mr-4">
                {<status.logo className="w-6 h-6 text-blue-600" />}
              </div>
              <div>
                <p className="font-medium">{status.title}</p>
                <p className="text-sm text-gray-500">{status.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerDashboard;
