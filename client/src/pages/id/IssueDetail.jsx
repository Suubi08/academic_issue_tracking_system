import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components";
import { Button } from "../../components/ui";
import { Badge } from "../../components/ui";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
import { Textarea } from "../../components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import LoadingSpinner from "../../components/loading-spinner";
import axios from "axios";

function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClick_1 = () => {
    navigate("/studentissues"); 
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchIssueAndComments();
  }, [id, navigate]);

  const fetchIssueAndComments = async () => {
    try {
      setLoading(true);
      
      const issueResponse = await axios.get(`http://localhost:8000/api/issues/${id}`);
    
      setIssue(issueResponse.data);
      console.log(issueResponse.data)

    } catch (err) {
      console.error("Error fetching issue details:", err);
      setError("Failed to fetch issue details. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "open":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Open
        </Badge>
      );
    case "in progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          In Progress
        </Badge>
      );
    case "resolved":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Resolved
        </Badge>
      );
    case "closed":
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          Closed
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};
const getPriorityBadge = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
        );
      case "medium":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Low
          </Badge>
        );
      default:
        return <Badge>Normal</Badge>;
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading issue details..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <Button className="mt-4" onClick={() => navigate("/studentissues")}>
          Back to Issues
        </Button>
      </div>
    );
  }




