import { useState, useEffect } from "react";
import { Button } from "../components/ui";
import { CardContent, StatusDropdown, Card, CardHeader, CardTitle } from "../components";
import { Badge } from "../components/ui";
import { Textarea } from "../components/ui";


import API from '../utils/axiosInstance';

const Lecturerissuemanagement = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [resolution, setResolution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewResolvePage, setViewResolvePage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("issues/");
        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setLoading(false);
        alert("Failed to fetch issues. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
          >
            pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            in progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleResolveIssue = (issue) => {
    setSelectedIssue(issue);
    setStatus(issue.status);
    setResolution("");
    setViewResolvePage(true);
  };

  const handleSubmitResolution = async () => {
    if (!status || !resolution.trim()) return;
  
    setIsSubmitting(true);
    setIsSubmitted(false);
  
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not logged in. Please log in and try again.");
        return;
      }
  
      const response = await API.put(
        `issues/${selectedIssue.id}/status/`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedIssue = response.data;
  
      await API.post(
        "comments/",
        {
          issue: updatedIssue.id,
          message: resolution,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === updatedIssue.id ? updatedIssue : issue
        )
      );
  
      setIsSubmitted(true);
      setTimeout(() => {
        setViewResolvePage(false);
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error resolving issue or sending comment:", error);
  
      if (error.response && error.response.status === 403) {
        alert("You do not have permission to update this issue.");
      } else {
        alert("An error occurred while resolving the issue. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading issues...</p>
      </div>
    );
  }

  if (viewResolvePage && selectedIssue) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setViewResolvePage(false)}
            className="mb-4"
          >
            Back to Issues
          </Button>
          <h1 className="text-2xl font-bold">Resolve Issue</h1>
          <p className="text-gray-600">
            Update status and provide resolution for this issue
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {selectedIssue.title}
                <div className="flex gap-2 mt-2">
                  {getStatusBadge(selectedIssue.status)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Issue ID</p>
                  <p className="font-medium">{selectedIssue.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Course</p>
                  <p className="font-medium">{selectedIssue.student_course}</p>
                </div>
                <div>
                  <p className="text-gray-500">Student</p>
                  <p className="font-medium">{selectedIssue.surname}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date Submitted</p>
                  <p className="font-medium">
                    {new Date(selectedIssue.date_of_issue).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 mb-2">Description</p>
                <div className="p-4 bg-gray-50 rounded-md border">
                  {selectedIssue.description}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Update Status</h3>
                <StatusDropdown status={status} setStatus={setStatus} />
              </div>


              <div className="space-y-2">
                <h3 className="font-medium">Resolution Notes</h3>
                <Textarea
                  placeholder="Provide details about how you resolved this issue..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
            <div className="flex justify-end gap-2 p-4">
              <Button
                variant="outline"
                onClick={() => setViewResolvePage(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitResolution}
                disabled={isSubmitting || !resolution.trim()}
                className={`${isSubmitted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-400 hover:bg-green-700"
                  } text-white`}
              >
                {isSubmitting
                  ? "Saving..."
                  : isSubmitted
                    ? "Resolution Submitted!"
                    : "Submit Resolution"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Issues</h1>
        <p className="text-gray-600">Manage and resolve student issues</p>
      </div>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Issue Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Issue ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Course
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Student
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date Submitted
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {issue.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">{issue.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {issue.student_course}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {issue.surname}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(issue.date_of_issue).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {getStatusBadge(issue.status)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button onClick={() => handleResolveIssue(issue)}>
                    View & Resolve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lecturerissuemanagement;