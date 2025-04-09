import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Link } from "react-router-dom"
import {
  LayoutDashboard,
  AlertCircle,
  Bell,
  BarChart3,
  Users,
  Settings,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

const AdminUserManagement = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const navigation = [
    { name: "Admin Dashboard", href: "/", icon: LayoutDashboard, description: "Overview of system activities" },
    { name: "Issue Management", href: "/issue-management", icon: AlertCircle, description: "Manage academic issues" },
    { name: "Notifications", href: "/notifications", icon: Bell, description: "View alerts and updates" },
    { name: "Reports", href: "/reports", icon: BarChart3, description: "Generate analytics and insights" },
    { name: "User Management", href: "/users", icon: Users, description: "Manage users and permissions" },
    { name: "Settings", href: "/settings", icon: Settings, description: "System preferences" },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col flex-grow md:ml-64">
        <header className="p-4">{getCurrentDate()}</header>
        <main className="flex-grow overflow-y-auto p-4">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
<nav className="px-2 mt-5 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href} // Updated for React Router
                className={`group flex items-center px-4 py-3 text-sm rounded-md ${
                  isActive ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-800"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-indigo-300 truncate">admin@university.edu</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserManagement

