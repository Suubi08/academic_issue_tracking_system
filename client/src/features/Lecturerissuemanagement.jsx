import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components";
import { Button } from "../components";
import { Badge } from "../components/ui/Badge";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { useToast } from "../components/ui/use_toast";
import axios from "axios";

const LecturerIssueManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const lecturerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("issues/");
        const myIssues = response.data.filter(
          (issue) => issue.assigned_to?.id?.toString() === lecturerId
        );
        setIssues(myIssues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [lecturerId]);

  const filteredIssues = issues.filter((issue) => {
    if (selectedCategory && issue.status.toLowerCase() !== selectedCategory) {
      return false;
    }

    if (
      searchTerm &&
      (!issue.category ||
        !issue.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!issue.surname ||
        !issue.surname.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        );
      case "in-progress":
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
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleUpdateStatus = (issueId, newStatus) => {
    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        return { ...issue, status: newStatus };
      }
      return issue;
    });
    setIssues(updatedIssues);
    toast({
      title: "Issue status updated",
      description:` Issue ${issueId} status has been updated to ${newStatus}`,
      duration: 3000,
    });
  };

  const handleAssignIssue = (issue) => {
    setSelectedIssue(issue);
    setStatus(issue.status);
    setComment("");
    setModalOpen(true);
  }
  console.log(localStorage.getItem("access_token"))

  const handleAssignSubmit = () => {
    if (!status || !comment) return; // Don't proceed if status or comment is empty
  
    // Update the issue status
    axios
      .put(
        `http://localhost:8000/api/issues/${selectedIssue.id}/status/`, 
        { status }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } } // Pass token for authorization
      )
      .then((response) => {
        const updatedIssue = response.data;
        console.log(localStorage.getItem("access_token"))
        
        // Now, send the comment for the updated issue
        axios
          .post("http://127.0.0.1:8000/api/comments/", {
            issue: updatedIssue.id,  // Ensure using the updated issue ID
            message: comment,         // The comment message being sent
          },  { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } } )
          .then((commentResponse) => {
            // Successfully created the comment
            toast({
              title: "Issue Updated",
              description: "The issue has been successfully updated, and the comment has been added.",
              duration: 3000,
            });
  
            // Update the issue list with the updated data
            setIssues((prevIssues) =>
              prevIssues.map((issue) =>
                issue.id === updatedIssue.id ? updatedIssue : issue
              )
            );
            
            setModalOpen(false); // Close the modal
          })
          .catch((error) => {
            console.error("Error adding comment:", error);
            toast({
              title: "Comment Failed",
              description: "There was an error adding the comment.",
              duration: 3000,
            });
          });
      })
      .catch((error) => {
        console.error("Error updating issue:", error);
        toast({
          title: "Update Failed",
          description: "There was an error updating the issue.",
          duration: 3000,
        });
      });
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Assigned Issues</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search issues or students"
                  className="pl-8 h-9 md:w-[250px] border border-gray-200 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student
                </label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  className="border border-gray-300 rounded-md p-2"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Issues</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIssues.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                        No issues found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredIssues.map((issue) => (
                      <tr key={issue.id}>
                        <td className="px-4 py-4">{issue.id}</td>
                        <td className="px-4 py-4">{issue.category}</td>
                        <td className="px-4 py-4">{issue.surname}</td>
                        <td className="px-4 py-4">{getStatusBadge(issue.status)}</td>
                        <td className="px-4 py-4">{issue.student_course}</td>
                        <td className="px-4 py-4">{new Date(issue.date_of_issue).toLocaleDateString()}</td>
                        <td className="px-4 py-4">
                          <Button size="sm" variant="outline" onClick={() => handleAssignIssue(issue)}>Update</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Update Issue Modal */}
      {modalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Issue</h2>
            <p className="mb-4">
              Update issue <strong>{selectedIssue.id}</strong>:{" "}
              {selectedIssue.title}
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Update Status</label>
                <select
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} // Use onChange instead of onValueChange
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Add Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-32 border rounded-md p-2"
                  placeholder="Enter your comment..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAssignSubmit}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerIssueManagement;
