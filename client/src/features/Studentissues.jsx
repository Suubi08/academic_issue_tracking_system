import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/Tabs";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Button } from "../components/ui/Button";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import API from '../utils/axiosInstance';

const Studentissues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [allIssues, setAllIssues] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get("issues/");
        
        // Transform API data to ensure consistent structure
        const formattedIssues = response.data.map(issue => ({
          id: issue.id || '',
          title: issue.course_unit || 'No title',
          status: (issue.status || 'pending').toLowerCase(),
          date_of_Issue: issue.date_of_issue || new Date().toISOString(),
          priority: issue.priority || 'medium',
          category: issue.category || 'general'
        }));
        
        setAllIssues(formattedIssues);
        setIssues(formattedIssues);
      } catch (err) {
        setError("Failed to fetch issues. Please try again later.");
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    if (allIssues.length === 0) return;

    let filteredIssues = [...allIssues];

    // Apply search filter with null checks
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredIssues = filteredIssues.filter((issue) => {
        const title = issue.title || '';
        const category = issue.category || '';
        return (
          title.toLowerCase().includes(searchLower) ||
          category.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.status.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    // Apply sorting
    filteredIssues.sort((a, b) => {
      const dateA = new Date(a.date_of_Issue || new Date());
      const dateB = new Date(b.date_of_Issue || new Date());

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setIssues(filteredIssues);
  }, [searchTerm, statusFilter, categoryFilter, priorityFilter, sortOrder, activeTab, allIssues]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");
    setSortOrder("newest");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (statusFilter !== "all") count++;
    if (categoryFilter !== "all") count++;
    if (priorityFilter !== "all") count++;
    if (sortOrder !== "newest") count++;
    return count;
  };

  const getStatusStyles = (status) => {
    const statusLower = (status || '').toLowerCase();
    switch (statusLower) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityStyles = (priority) => {
    const priorityLower = (priority || '').toLowerCase();
    switch (priorityLower) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Calculate statistics
  const totalIssues = allIssues.length;
  const pendingIssues = allIssues.filter(
    (issue) => issue.status === "pending"
  ).length;
  const inProgressIssues = allIssues.filter(
    (issue) => issue.status === "in progress"
  ).length;
  const resolvedIssues = allIssues.filter(
    (issue) => issue.status === "resolved"
  ).length;

  // Get unique categories
  const categories = [
    "all",
    ...new Set(allIssues.map((issue) => issue.category).filter(Boolean)),
  ];

  const renderIssuesList = (issues) => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading issues...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 text-sm"
          >
            Refresh page
          </button>
        </div>
      );
    }

    if (issues.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No issues found matching your filters.
          </p>
          <button onClick={clearFilters} className="mt-2 text-blue-600 text-sm">
            Clear filters
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-4 mb-3 md:mb-0">
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shrink-0">
                <span className="text-lg font-semibold">
                  {new Date(issue.date_of_Issue).getDate()}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(issue.date_of_Issue).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{issue.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusStyles(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityStyles(
                      issue.priority
                    )}`}
                  >
                    {issue.priority}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    {issue.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: {new Date(issue.date_of_Issue).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 self-end md:self-auto"
              onClick={() => navigate(`/viewissue/${issue.id}`)}
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Issues</p>
                <p className="text-2xl font-bold">{totalIssues}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">{pendingIssues}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold">{inProgressIssues}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Resolved</p>
                <p className="text-2xl font-bold">{resolvedIssues}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Issue Tracking</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search issues"
                  className="pl-8 h-9 md:w-[200px] lg:w-[250px] border border-gray-200 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  showFilters || getActiveFiltersCount() > 0
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : ""
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filter
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                }
              >
                <ChevronDown
                  className={`h-4 w-4 mr-1 transition-transform ${
                    sortOrder === "oldest" ? "rotate-180" : ""
                  }`}
                />
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </Button>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 flex items-center"
                >
                  Clear all <X className="h-3 w-3 ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-medium block mb-1">
                    Status
                  </label>
                  <select
                    className="w-full text-sm p-1.5 border border-gray-200 rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">
                    Category
                  </label>
                  <select
                    className="w-full text-sm p-1.5 border border-gray-200 rounded-md"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">
                    Priority
                  </label>
                  <select
                    className="w-full text-sm p-1.5 border border-gray-200 rounded-md"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-4">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All Issues
                <Badge className="ml-2 bg-gray-100 text-gray-800">
                  {totalIssues}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge className="ml-2 bg-red-100 text-red-800">
                  {pendingIssues}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="in progress">
                In Progress
                <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                  {inProgressIssues}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved
                <Badge className="ml-2 bg-green-100 text-green-800">
                  {resolvedIssues}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {renderIssuesList(issues)}
          </Tabs>
        </CardContent>

        {issues.length > 0 && (
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-gray-500">
              Showing {issues.length} of {allIssues.length} issues
            </div>
            {(searchTerm ||
              statusFilter !== "all" ||
              categoryFilter !== "all" ||
              priorityFilter !== "all" ||
              sortOrder !== "newest") && (
              <button onClick={clearFilters} className="text-sm text-blue-600">
                Clear filters
              </button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Studentissues;