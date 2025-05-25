import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance";

const AdminIssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await API.get("issues/");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const statusMatches =
      statusFilter === "all" || issue.status === statusFilter;
    const category = issue.category || ""; // fallback if category is missing
    const searchMatches = category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return statusMatches && searchMatches;
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Issue Management</h1>

      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Search by category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-4 border rounded shadow bg-white"
          >
            <h3 className="text-lg font-medium">
              {issue.category || "Uncategorized"}
            </h3>
            <p className="text-gray-600">
              {issue.description || "No description provided."}
            </p>
            <span className="inline-block mt-2 text-sm text-white bg-blue-500 px-2 py-1 rounded">
              {issue.status || "Unknown"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminIssueManagement;
