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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
const Adminusermanagement = ({ children }) => {
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
        <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="mt-5 px-2 space-y-1 overflow-y-auto flex-grow">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-indigo-800 dark:bg-indigo-900 text-white"
                      : "text-indigo-100 hover:bg-indigo-800 dark:hover:bg-indigo-900",
                  )}
                  title={item.description}
                > <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="mt-5 px-2 space-y-1 overflow-y-auto flex-grow">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-indigo-800 dark:bg-indigo-900 text-white"
                      : "text-indigo-100 hover:bg-indigo-800 dark:hover:bg-indigo-900",
                  )}
                  title={item.description}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-indigo-800 dark:border-indigo-900">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
  </div>;
};

export default Adminusermanagement;
