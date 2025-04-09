import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  AlertCircle,
  Bell,
  BarChart3,
  Users,
  Settings,
  Menu,
  Search,
  User,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const Adminusermanagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  // Navigation items
  const navigation = [
    {
      name: "Admin Dashboard",
      href: "/",
      icon: LayoutDashboard,
      description: "Overview of all system activities and metrics",
    },
    {
      name: "Issue Management",
      href: "/issue-management",
      icon: AlertCircle,
      description: "View, assign, and track academic issues with filters and search",
    },
    {
      name: "Notifications & Alerts",
      href: "/notifications",
      icon: Bell,
      description: "Receive updates on pending and resolved issues",
    },
    {
      name: "Reports & Analytics",
      href: "/reports",
      icon: BarChart3,
      description: "Generate insights on issue resolution and lecturer performance",
    },
    {
      name: "User Management",
      href: "/users",
      icon: Users,
      description: "Manage students, lecturers, and permissions",
    },
    {
      name: "System Settings",
      href: "/settings",
      icon: Settings,
      description: "Adjust preferences and monitor cloud deployment",
    },
  ]
   // Handle theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get current date in formatted string
  const getCurrentDate = () => {
    const date = new Date()
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  return <div  className="flex h-screen bg-gray-50 dark:bg-gray-900">
    {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 dark:bg-indigo-950 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:h-screen",
        )}
      >
  </div>;
};

export default Adminusermanagement;
