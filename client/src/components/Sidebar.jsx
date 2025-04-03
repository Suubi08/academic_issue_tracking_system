"use client";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  FileWarning,
  BarChart3,
  LogOut,
  PlusCircle,
  Bell,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

const Sidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const userRole = localStorage.getItem("role") || "student";

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    // Redirect to login
    navigate("/login");
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (userRole === "student") {
      return [
        {
          to: "/studentdashboard",
          icon: LayoutDashboard,
          label: "Dashboard",
        },
        {
          to: "/submitissue",
          icon: PlusCircle,
          label: "Submit Issue",
        },
        {
          to: "/studentissues",
          icon: PlusCircle,
          label: "My Issues",
        },
        {
          to: "/studentsettings",
          icon: PlusCircle,
          label: "Settings and Profile",
        },
      ];
    } else if (userRole === "lecturer") {
      return [
        {
          to: "/lecturer-dashboard",
          icon: LayoutDashboard,
          label: "Dashboard",
        },
        {
          to: "/issuemanagement",
          icon: FileWarning,
          label: "Issue management",
        },
        {
          to: "/status-update",
          icon: FileWarning,
          label: "Status and Updates",
        },
        {
          to: "/lecturernotifications",
          icon: Bell,
          label: "Notifications & Alerts",
        },
        {
          to: "/lecturersettings",
          icon: Settings,
          label: "Settings",
        },
      ];
    } else if (userRole === "admin") {
      return [
        {
          to: "/admin-dashboard",
          icon: LayoutDashboard,
          label: "Dashboard",
        },
        {
          to: "/adminissuemanagement",
          icon: FileWarning,
          label: "Issue management",
        },
        {
          to: "/adminNotifications",
          icon: Bell,
          label: "Notifications & Alerts",
        },
        {
          to: "/adminusermanagement",
          icon: UserCog,
          label: "User Management",
        },
        {
          to: "/adminreports",
          icon: PlusCircle,
          label: "Report & Analytics",
        },
        {
          to: "/adminsettings",
          icon: Settings,
          label: "Settings & Profile",
        },
      ];
    } else if (userRole === "academic_registrar") {
      return [
        {
          to: "/registrar-dashboard",
          icon: LayoutDashboard,
          label: "Dashboard",
        },
        ...commonLinks,
      ];
    }

    return commonLinks;
  };

  const navLinks = getNavLinks();

  return (
    <aside className="h-screen bg-blue-950 text-white p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-10 mt-15">
          <img
            src="/placeholder.svg?height=64&width=64"
            alt="Logo"
            className="w-16 h-16"
          />
          <h1 className="text-xl font-bold">AITS</h1>
          <p className="text-xs text-gray-300 mt-1">
            Academic Issue Tracking System
          </p>
        </div>
        <ul className="flex flex-col gap-2 flex-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                    isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                  }`
                }
              >
                <link.icon size={20} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User profile and logout */}
        <div className="mt-auto pt-4 border-t border-blue-800">
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={username} />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="ml-2 font-medium">{username}</span>
              <p className="text-xs text-gray-300">{userRole}</p>
            </div>
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
  );
};

export default Sidebar;
