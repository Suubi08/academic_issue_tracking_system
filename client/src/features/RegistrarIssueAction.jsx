import { useState, useEffect } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  Search,
  UserPlus,
} from "lucide-react";
import { Button } from "../components";
import { Input } from "../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../components/Table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";
import { useToast } from "../components/ui/use_toast";
import { Badge } from "../components";
import { Card, CardHeader, CardTitle, CardContent } from "../components";
import axios from "axios";
import API from '../utils/axiosInstance';

const RegistrarIssueAction = () => {
  const { toast } = useToast();
  const [issues, setIssues] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Fetch issues and lecturers from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const [issuesRes, lecturersRes] = await Promise.all([
          API.get("issues/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("users/lecturer/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setIssues(issuesRes.data);
        setLecturers(lecturersRes.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch issues or lecturers.",
          variant: "destructive",
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [toast]);

  const handleAssignIssue = (issue) => {
    setSelectedIssue(issue);
    setSelectedLecturer("");
    setAssignDialogOpen(true);
  };

  const confirmAssign = async () => {
    if (selectedIssue && selectedLecturer) {
      try {
        const token = localStorage.getItem("accessToken");
        await API.patch(
          `issues/${selectedIssue.id}/`,
          { assigned_to: selectedLecturer, status: "in_progress" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const issuesRes = await API.get("issues/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(issuesRes.data);
        toast({
          title: "Issue Assigned",
          description: `Issue ${selectedIssue.id} has been assigned.`,
        });
        setAssignDialogOpen(false);
        setSelectedLecturer("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to assign issue.",
          variant: "destructive",
        });
      }
    }
  };

  const handleResolveIssue = async (issue) => {
    try {
      const token = localStorage.getItem("accessToken");
      await API.patch(
        `issues/${issue.id}/`,
        { status: "resolved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const issuesRes = await API.get("issues/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssues(issuesRes.data);
      toast({
        title: "Issue Resolved",
        description: `Issue ${issue.id} has been marked as resolved`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resolve issue.",
        variant: "destructive",
      });
    }
  };

  // Filter issues based on search term and filters
  const filteredIssues = issues.filter((issue) => {
    const search = searchTerm.toLowerCase();
    const combined = [
      issue.id,
      issue.student_full_name,
      issue.surname,
      issue.student_name,
      issue.student,
      issue.student_number,
      issue.type,
      issue.category,
      issue.status,
      issue.assigned_to_name,
      issue.assigned_to,
    ]
      .map((v) => (v ? v.toString().toLowerCase() : ""))
      .join(" ");
    const matchesSearch = combined.includes(search);
    const matchesStatus =
      statusFilter === "all" ||
      (issue.status &&
        issue.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesType =
      typeFilter === "all" ||
      (issue.type && issue.type.toLowerCase() === typeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "assigned":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Assigned
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLecturerDisplayName = (lecturer) => {
    if (!lecturer) return "Unknown";
    if (lecturer.first_name || lecturer.last_name) {
      return `Dr. ${lecturer.first_name ?? ""} ${
        lecturer.last_name ?? ""
      }`.trim();
    }
    return lecturer.username ?? lecturer.name ?? "Unknown";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Issue Actions</h2>

      <Card>
        <CardHeader>
          <CardTitle>Issue Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
                className="w-full sm:w-[180px]"
                placeholder="Filter by status"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
                className="w-full sm:w-[180px]"
                placeholder="Filter by type"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading issues...</span>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Issue ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned Lecturer</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-4 text-muted-foreground"
                          >
                            No issues found matching your filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredIssues.map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-medium">
                              {issue.id}
                            </TableCell>
                            <TableCell>
                              {issue.student_full_name ||
                                issue.surname ||
                                issue.student_name ||
                                issue.student ||
                                "—"}
                              {issue.student_number
                                ? ` (${issue.student_number})`
                                : ""}
                            </TableCell>
                            <TableCell>
                              {issue.type || issue.category || "—"}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(issue.status)}
                            </TableCell>
                            <TableCell>
                              {(() => {
                                const lecturerObj = lecturers.find(
                                  (l) =>
                                    l.id ===
                                    (typeof issue.assigned_to === "number"
                                      ? issue.assigned_to
                                      : parseInt(issue.assigned_to, 10))
                                );
                                if (lecturerObj) {
                                  return getLecturerDisplayName(lecturerObj);
                                }
                                if (issue.assigned_to_name) {
                                  return `Dr. ${issue.assigned_to_name}`;
                                }
                                if (issue.assigned_to) {
                                  return `Dr. ${issue.assigned_to}`;
                                }
                                return "—";
                              })()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleAssignIssue(issue)}
                                  disabled={
                                    !!(
                                      issue.assigned_to ||
                                      issue.assigned_to_name
                                    ) ||
                                    (issue.status || "").toLowerCase() ===
                                      "resolved"
                                  }
                                  title="Assign to Lecturer"
                                >
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleResolveIssue(issue)}
                                  disabled={
                                    !(
                                      issue.assigned_to ||
                                      issue.assigned_to_name
                                    ) ||
                                    (issue.status || "").toLowerCase() ===
                                      "resolved"
                                  }
                                  title="Mark as Resolved"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">{filteredIssues.length}</span>{" "}
                    of <span className="font-medium">{issues.length}</span>{" "}
                    issues
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon">
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Issue to Lecturer</DialogTitle>
            <DialogDescription>
              Select a lecturer to assign this issue to.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium">Issue Details:</p>
              <p className="text-sm">ID: {selectedIssue?.id ?? "N/A"}</p>
              <p className="text-sm">
                Student:{" "}
                {selectedIssue?.student_full_name ||
                  selectedIssue?.surname ||
                  selectedIssue?.student_name ||
                  selectedIssue?.student ||
                  "N/A"}
                {selectedIssue?.student_number
                  ? ` (${selectedIssue.student_number})`
                  : ""}
              </p>
              <p className="text-sm">
                Type: {selectedIssue?.type ?? selectedIssue?.category ?? "N/A"}
              </p>
            </div>

            <Select
              value={selectedLecturer}
              onValueChange={setSelectedLecturer}
              className="w-full"
              placeholder="Select a lecturer"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lecturers.map((lecturer) => (
                  <SelectItem key={lecturer.id} value={lecturer.id.toString()}>
                    {lecturer.first_name || lecturer.last_name
                      ? `Dr. ${lecturer.first_name ?? ""} ${
                          lecturer.last_name ?? ""
                        }`.trim()
                      : lecturer.username ?? lecturer.name ?? "Unknown"}{" "}
                    ({lecturer.department ?? "N/A"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmAssign} disabled={!selectedLecturer}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrarIssueAction;