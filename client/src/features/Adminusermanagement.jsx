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
