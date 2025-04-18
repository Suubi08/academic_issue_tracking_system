
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
                    <AvatarImage src={profile.avatar} alt={profile.name} />
         
