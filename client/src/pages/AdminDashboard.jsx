import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components";
import { AlertCircle, Bell, MessageSquare, Users } from "lucide-react";
import axios from "axios";
import API from "../utils/axiosInstance";

const AdminDashboard = () => {
  const [allIssues, setAllIssues] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    // Ensure the user is an admin or academic registrar
    if (userRole !== "admin" && userRole !== "academic_registrar") {
      navigate("/login");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("issues/");
        //console.log(response.data);
        setAllIssues(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //calculate statistics
  const totalIssues = allIssues.length;
  const activeIssues = allIssues.filter(
    (issue) => issue.status !== "resolved"
  ).length;

  console.log("Total Issues:", totalIssues);
  console.log("Active Issues:", activeIssues);

  //calulate date
  function date_calculate(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds}seconds ago`;
    if (minutes < 60) return `${minutes}minutes ago`;
    if (hours < 24) return `${hours}hours ago`;
    if (days < 30) return `${days}days ago`;

    // For older dates, return full date
    return past.toLocaleDateString();
  }

  // Example usage
  [];
  const summaryItems = [
    {
      title: "Active Issues",
      value: activeIssues,
      description: "Across all categories",
      icon: AlertCircle,
      color: "text-red-500",
      linkText: "View more",
    },
    {
      title: "Assigned Issues",
      value: totalIssues,
      description: "To lecturers",
      icon: Users,
      color: "text-blue-500",
      linkText: "View more",
    },

    {
      title: "Pending Notifications",
      value: "12",
      description: "Unread",
      icon: Bell,
      color: "text-yellow-500",
      linkText: "View more",
    },
  ];

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-6">
        {userRole === "admin"
          ? "Admin Dashboard"
          : "Academic Registrar Dashboard"}
      </h1> */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {summaryItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-md">{item.title}</CardTitle>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground text-gray-400">
                {item.description}
              </p>
              <a className="text-xs text-blue-600 mt-2 block" href="#">
                {item.linkText}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allIssues.map((i) => (
                <div key={i.id} className="flex items-start p-3 border rounded-md">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      Issue #{i.id}:{i.category}
                    </h3>{" "}
                    <p className="text-sm text-gray-500">
                      Reported by {i.surname}-{i.student_number} •{" "}
                      {date_calculate(i.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Server Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Healthy
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Services</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Backup</span>
                <span className="text-sm">Today, 03:00 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
