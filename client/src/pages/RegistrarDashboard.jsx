import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "../components";
import { Filter, Search, AlertCircle, CheckCircle, Clock, UserPlus } from "lucide-react";
import { useToast } from "../components/ui/use_toast";
import API from '../utils/axiosInstance';

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

  // For older dates, return full date
  return past.toLocaleDateString();
}

const RegistrarDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [allIssues, setAllIssues] = useState([]); // For Recent Issues card

  // Extract unique departments from users
  const departments = useMemo(() => {
    const depts = new Set();
    users.forEach(user => {
      if (user.department) depts.add(user.department);
    });
    return Array.from(depts);
  }, [users]);

  // Filter issues
  const filteredIssues = useMemo(() => {
    if (!Array.isArray(issues)) return [];
    return issues.filter((issue) => {
      const matchesSearch = searchTerm
        ? (issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.student?.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      const matchesStatus = statusFilter !== "all"
        ? issue.status === statusFilter
        : true;
      const matchesDepartment = departmentFilter !== "all"
        ? issue.department === departmentFilter
        : true;
      const matchesTab = activeTab === "all"
        ? true
        : activeTab === "unassigned"
          ? !issue.assignedTo
          : !!issue.assignedTo;
      return matchesSearch && matchesStatus && matchesDepartment && matchesTab;
    });
  }, [issues, searchTerm, statusFilter, departmentFilter, activeTab]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: issues.length,
      pending: issues.filter(issue => issue.status === "pending").length,
      inProgress: issues.filter(issue => issue.status === "in progress" || issue.status === "in_progress").length,
      resolved: issues.filter(issue => issue.status === "resolved").length,
      unassigned: issues.filter(issue => !issue.assigned_to),
    };
  }, [issues]);

  const handleAssignIssue = async (issue) => {
    try {
      // Implement your assign logic here
      toast({
        title: "Issue assigned",
        description: `Issue "${issue.description}" has been assigned.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign issue.",
        duration: 3000,
      });
    }
  };

  const handleUpdateStatus = async (issueId, status) => {
    try {
      // Implement your status update logic here
      toast({
        title: "Status updated",
        description: `Issue status changed to ${status}.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (!token || role !== "academic_registrar") {
      navigate("/login");
      return;
    }

    setUsername(storedUsername || "Academic Registrar");

    const fetchData = async () => {
      try {
        const [issuesRes, usersRes, allIssuesRes] = await Promise.all([
          API.get("issues/"),
          API.get("users/"),
          API.get("issues/"),
        ]);
        setIssues(Array.isArray(issuesRes.data) ? issuesRes.data : []);
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setAllIssues(Array.isArray(allIssuesRes.data) ? allIssuesRes.data : []);
        toast({
          title: "Welcome back!",
          description: "You're now viewing your academic registrar dashboard.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setIssues([]);
        setUsers([]);
        setAllIssues([]);
        toast({
          title: "Error",
          description: "Failed to load dashboard data.",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}!</h1>
        <p className="text-gray-600 mt-2">Manage and oversee all academic issues in the system.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <div className="text-2xl font-bold mt-1">{stats.inProgress}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Filter className="h-5 w-5 text-orange-600" />
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
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Unassigned</p>
                <div className="text-2xl font-bold mt-1">{stats.unassigned.length}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues Card */}
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
                    Issue #{i.id}: {i.category}
                  </h3>
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
    </div>
  );
};

export default RegistrarDashboard;