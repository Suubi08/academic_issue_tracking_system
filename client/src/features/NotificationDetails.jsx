import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../components";
import { Button } from "../components";
import { toast } from "react-toastify";

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `https://aitsh-47039bb03354.herokuapp.com/api/notifications/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setNotification(response.data);

        // Mark as read if not already
        if (!response.data.read) {
          await axios.patch(
            `https://aitsh-47039bb03354.herokuapp.com/api/notifications/${id}/`,
            { read: true },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
        }
      } catch (error) {
        toast.error("Failed to fetch notification details.");
        navigate("/lecturernotifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, [id, navigate]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!notification) {
    return (
      <div className="p-8 text-center text-red-500">
        Notification not found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{notification.title || "Notification Detail"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <strong>Type:</strong> {notification.type}
          </div>
          <div className="mb-4">
            <strong>Message:</strong>
            <div className="mt-1">{notification.message}</div>
          </div>
          <div className="mb-4">
            <strong>Status:</strong>{" "}
            {notification.read ? (
              <span className="text-green-600">Read</span>
            ) : (
              <span className="text-yellow-600">Unread</span>
            )}
          </div>
          <div className="mb-4">
            <strong>Timestamp:</strong>{" "}
            {new Date(notification.timestamp).toLocaleString()}
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationDetails;
