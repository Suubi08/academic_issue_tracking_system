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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">State Updates</h2>
        <Button onClick={refreshUpdates} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh State
            </>
          )}
        </Button>
      </div>

      <Alert>
        <Activity className="h-4 w-4" />
        <AlertTitle>System Status</AlertTitle>
        <AlertDescription>
          All systems are operational. Last updated: {lastUpdated}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>State Update Log</CardTitle>
          <CardDescription>
            History of system state changes and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className="flex items-start space-x-4 border-b pb-4 last:border-0"
              >
                <div className="mt-0.5">{getUpdateIcon(update.type)}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{update.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {update.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {update.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {updates.length} updates
          </p>
          <Button variant="outline" size="sm">
            View All Updates
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Current status of system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Frontend Services</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Backend API</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Database</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">
                  Authentication Service
                </span>
              </div>
              <span className="text-sm text-yellow-600">
                Degraded Performance
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Email Service</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminReports;
