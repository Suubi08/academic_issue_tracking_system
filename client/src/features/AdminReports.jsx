import { useState } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { Button } from "../components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components";
import { useToast } from "../components/ui/use_toast";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";

const AdminReports = () => {
   const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Today at 10:30 AM");
  const [updates, setUpdates] = useState([
    {
      id: "u1",
      title: "System Update Completed",
      description:
        "All system components have been updated to the latest version",
      timestamp: "Today at 10:30 AM",
      type: "success",
    },
    {
      id: "u2",
      title: "Database Maintenance",
      description: "Scheduled database maintenance completed successfully",
      timestamp: "Yesterday at 11:45 PM",
      type: "info",
    },
    {
      id: "u3",
      title: "API Rate Limit Increased",
      description:
        "The API rate limit has been increased to handle more requests",
      timestamp: "2 days ago at 3:20 PM",
      type: "info",
    },
    {
      id: "u4",
      title: "Security Patch Applied",
      description: "Critical security patch has been applied to all servers",
      timestamp: "3 days ago at 9:15 AM",
      type: "success",
    },
  ]);
  const refreshUpdates = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add a new update at the top
    const newUpdate = {
      id: `u${updates.length + 1}`,
      title: "State Refresh Completed",
      description: "System state has been refreshed with the latest data",
      timestamp: "Just now",
      type: "success",
    };

    setUpdates([newUpdate, ...updates]);
    setLastUpdated("Just now");
    setLoading(false);

    toast({
      title: "State Updated",
      description: "The system state has been refreshed successfully",
    });
  };
  const getUpdateIcon = (type) => {
    switch (type) {
      case "info":
        return <Activity className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };


  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">System Reports</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">User Activity</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">User activity chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Shows login activity and system usage over time.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">Issue Resolution</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Issue resolution chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Tracks issue resolution times and success rates.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">System Performance</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">System performance chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Monitors system response times and resource usage.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-base font-medium">User Distribution</h3>
          <div className="h-60 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">User distribution chart placeholder</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Shows the distribution of users by role and status.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
