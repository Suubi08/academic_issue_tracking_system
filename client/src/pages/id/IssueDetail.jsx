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


