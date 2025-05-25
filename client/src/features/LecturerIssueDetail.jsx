import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// IssueDetails Component
const LecturerIssueDetails = () => {
  const { id } = useParams(); // Get the issue ID from the URL parameters
  const [notification, setNotification] = useState(null); // State to hold the notification
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    console.log("Issue ID:", id); // Debugging
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/issues/${id}`
        );
        setNotification(response.data); // Update state with fetched data
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching notification:", error);
        setError("Failed to fetch notification. Please try again later.");
      }
    };

    fetchData();
  }, [id]); // Dependency array ensures the effect runs when `id` changes

  // Handle case where an error occurred
  if (error) {
    return (
      <div className="bg-white p-6 shadow rounded-lg mt-6">
        <h3 className="text-xl font-semibold text-red-600">Error</h3>
        <p className="text-gray-500">{error}</p>
        <Link
          to="/notifications"
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Notifications
        </Link>
      </div>
    );
  }

  // Handle case where notification is not found or still loading
  if (!notification) {
    return (
      <div className="bg-white p-6 shadow rounded-lg mt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Loading Notification...
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg mt-6">
      <h3 className="text-xl font-semibold text-gray-800">
        {notification.title}
      </h3>
      <p className="text-gray-500">
        Assigned on: {format(new Date(notification.created_at), "PPP")}
      </p>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800">Issue Description:</h4>
        <p className="text-gray-600">{notification.description}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800 mb-4">Due Date:</h4>
        <p className="text-gray-600">{notification.dueDate}</p>
      </div>

      {/* Button to go back to notifications list */}
      <Link
        to="/lecturernotifications"
        className="mt-8 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Back to Notifications
      </Link>
    </div>
  );
};

export default LecturerIssueDetails;
