
import { Switch } from "../components/ui";
import { Textarea } from "../components/ui";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../components/ui";
import { Input } from "../components/ui";
import { Label } from "../components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui";
import { useState } from "react";
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
const  RegistrarSettings = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    title: "Associate Professor",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=100&width=100",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
    issueAssigned: true,
    issueUpdated: true,
    systemUpdates: false,
  });

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
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} /
                      >
                             <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          handleProfileChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) =>
                          handleProfileChange("title", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        defaultValue={profile.department}
                        onValueChange={(value) =>
                          handleProfileChange("department", value)
                        }
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">
                            Computer Science
                          </SelectItem>
                          <SelectItem value="Mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a short bio about yourself"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
         
