import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components";
import { AlertCircle, CheckCircle, Clock, RefreshCw } from "lucide-react";
import API from "../utils/axiosInstance";

function date_calculate(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;

  return past.toLocaleDateString();
}

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const lecturerId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!lecturerId || userRole !== "lecturer") {
      navigate("/login");
      return;
    }
    setUsername(localStorage.getItem("username") || "Lecturer");

    const fetchIssues = async () => {
      try {
        const response = await API.get("issues/");
        // Only issues assigned to this lecturer
        const myIssues = response.data.filter(
          (issue) =>
            issue.assigned_to === Number(lecturerId) ||
            issue.assigned_to === lecturerId // in case it's a string
        );
        setIssues(myIssues);
      } catch (error) {
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [lecturerId, userRole, navigate]);

  // Calculate stats for this lecturer
  const stats = useMemo(() => {
    return {
      total: issues.length,
      pending: issues.filter((issue) => issue.status === "pending").length,
      in_progress: issues.filter((issue) => issue.status === "in_progress").length,
      resolved: issues.filter((issue) => issue.status === "resolved").length,
    };
  }, [issues]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}!</h1>
        <p className="text-gray-600 mt-2">Here are your assigned issues and stats.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <div className="text-2xl font-bold mt-1">{stats.total}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <div className="text-2xl font-bold mt-1">{stats.pending}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <div className="text-2xl font-bold mt-1">{stats.in_progress}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <div className="text-2xl font-bold mt-1">{stats.resolved}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Issues Table */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Student</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="py-4 px-6">
                      {issue.title || issue.category || "Untitled"}
                    </td>
                    <td className="py-4 px-6">
                      {issue.student_first_name} {issue.student_last_name} {issue.student_number}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : issue.status === "in_progress"
                            ? "bg-orange-100 text-orange-800"
                            : issue.status === "Critical"
                            ? "bg-red-100 text-red-800"
                            : issue.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {issue.status === "in_progress" ? "In Progress" : issue.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {date_calculate(issue.created_at)}
                    </td>
                  </tr>
                ))}
                {issues.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      No issues assigned to you.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerDashboard;