
import { useState, useEffect } from "react";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import {
  Calendar,
  IssueChart,
  ShowSlide,
  TrackStudentIssues,
  UserInfoCard,
} from "../components";
import IssueTracking from "../components/IssueTracking";
import axios from "axios";

const Studentdashboard = () => {
  const images = [image1, image2, image3];

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [user, setUser] = useState({
    username: "",
    regNo: "REG NO",
    semester: "II",
    course: "",
    year: "2025",
    profilePic: false,
  });

  const [allIssues,setAllIssues]=useState([])
  const [issues, setIssues] = useState(allIssues);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/issues/");
        setAllIssues(response.data);
        setIssues(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchIssues();
  }, []);
 

  // Apply filters when search term or status filter changes
  useEffect(() => {
    let filteredIssues = [...allIssues];

    // Apply search filter
    if (searchTerm) {
      filteredIssues = filteredIssues.filter((issue) =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredIssues = filteredIssues.filter(
        (issue) => issue.status === statusFilter
      );
    }

    setIssues(filteredIssues);
    setLoading(false);
  }, [searchTerm, statusFilter]);

  // Calculate statistics based on filtered issues
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(
    (issue) => issue.status === "resolved"
  ).length;
  const inProgressIssues = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;
  const pendingIssues = issues.filter(
    (issue) => issue.status === "pending"
  ).length;

  // Handle search and filter changes
  const handleSearch = (term) => {
    setSearchTerm(term);
    setLoading(true);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setLoading(true);
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <ShowSlide images={images} />
        <TrackStudentIssues
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
        />
        <IssueChart
          totalissues={totalIssues}
          resolvedIssues={resolvedIssues}
          inProgressIssues={inProgressIssues}
          pendingIssues={pendingIssues}
        />
      </div>
      <div className="col-span-1">
        <UserInfoCard user={user} />
        <Calendar issues={issues} isLoading={loading} />
        <IssueTracking />
      </div>
    </div>
  );
};

export default Studentdashboard;
