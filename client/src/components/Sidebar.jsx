"use client"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
import { LayoutDashboard, Settings, FileWarning, BarChart3, LogOut, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"

const Sidebar = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username") || "User"

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("role")
    localStorage.removeItem("username")

    // Redirect to login
    navigate("/login")
  }

  return (
    <aside className="h-screen bg-blue-950 text-white p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-10 mt-15">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-16 h-16" />
          <h1 className="text-xl font-bold">AITS</h1>
        </div>
        <ul className="flex flex-col gap-2 flex-1">
          <li>
            <NavLink
              to="/studentdashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/issues"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <FileWarning size={20} />
              My Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/issuereport"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <PlusCircle size={20} className="mr-2" />
              Report Issue
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <BarChart3 size={20} className="mr-2" />
              Reports & Analysis
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <Settings size={20} className="mr-2" />
              Settings
            </NavLink>
          </li>
        </ul>

        {/* User profile and logout */}
        <div className="mt-auto pt-4 border-t border-blue-800">
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={username} />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="ml-2 font-medium">{username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md transition w-full hover:bg-blue-800 text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

