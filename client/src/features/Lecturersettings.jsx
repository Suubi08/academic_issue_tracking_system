"use client";

import { useState, useEffect } from "react";
import { Switch } from "../components/ui";


import { Input } from "../components/ui";
import { Label } from "../components/ui";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components";
import { Button } from "../components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui";
import { User, Bell, Shield, Key } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Lecturersettings = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject_taught: "",
    department: "",
    lecture_number: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
    issueAssigned: true,
    issueUpdated: true,
    systemUpdates: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const lecturerId = localStorage.getItem("userId");
      if (!lecturerId) {
        toast.error("Lecturer ID not found. Please log in again.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/lecturer/${lecturerId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || "",
          subject_taught: response.data.subject_taught || "",
          department: response.data.department || "",
          lecture_number: response.data.lecture_number || "",
        });
      } catch (error) {
        toast.error("Failed to fetch profile information.");
      }
    };
    fetchProfile();
  }, []);

  console.log("Profile Data:", profile); // Debugging the profile data
  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <h1 className=" font-bold">{profile.first_name}</h1>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <h1 className=" font-bold">{profile.last_name}</h1>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <h1 className=" font-bold">{profile.email}</h1>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject_taught">subject_taught</Label>
                      <h1 className=" font-bold">{profile.subject_taught}</h1>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <h1 className=" font-bold">{profile.department}</h1>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lecture_number">Lecture Number</Label>
                    <h1 className=" font-bold">{profile.lecture_number}</h1>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">
                        Browser Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications in your browser
                      </p>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={notifications.browser}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("browser", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-notifications">
                        Mobile Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications on your mobile device
                      </p>
                    </div>
                    <Switch
                      id="mobile-notifications"
                      checked={notifications.mobile}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("mobile", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="issue-assigned">Issue Assigned</Label>
                      <p className="text-sm text-gray-500">
                        When a new issue is assigned to you
                      </p>
                    </div>
                    <Switch
                      id="issue-assigned"
                      checked={notifications.issueAssigned}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("issueAssigned", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="issue-updated">Issue Updated</Label>
                      <p className="text-sm text-gray-500">
                        When there are updates to your assigned issues
                      </p>
                    </div>
                    <Switch
                      id="issue-updated"
                      checked={notifications.issueUpdated}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("issueUpdated", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-gray-500">
                        Notifications about system maintenance and updates
                      </p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("systemUpdates", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Lecturersettings;
