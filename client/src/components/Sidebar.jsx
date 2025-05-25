import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  FileWarning,
  LogOut,
  PlusCircle,
  Bell,
  FileText,
  RefreshCcw,
  UserPlus,
  UserCheck,
} from "lucide-react";
import logo2 from "../assets/logo2.png";

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
          to: "/student-dashboard",
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
          icon: FileText,
          label: "My Issues",
        },
        {
          to: "/studentsettings",
          icon: Settings,
          label: "Settings & Profile",
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
          label: "Issue Management",
        },
        {
          to: "/status-update",
          icon: RefreshCcw,
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
          label: "Settings & Profile",
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
          icon: UserPlus,
          label: "Issue Actions",
        },
        {
          to: "/adminNotifications",
          icon: Bell,
          label: "Notifications & Alerts",
        },

        {
          to: "/adminreports",
          icon: UserCheck,
          label: "State Updates",
        },
      ];
    } else if (userRole === "academic_registrar") {
      return [
        {
          to: "/registrar-dashboard",
          icon: LayoutDashboard,
          label: "Dashboard",
        },
        {
          to: "/registrarNotifications",
          icon: Bell,
          label: "Notifications & Alerts",
        },
        {
          to: "/registrarissueaction",
          icon: PlusCircle,
          label: "Issue Actions",
        },

        {
          to: "/registrarSettings",
          icon: Settings,
          label: "Settings & Profile",
        },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  return (
    <aside className="h-screen bg-zinc-900 text-white p-4 flex flex-col">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="flex flex-col items-center mb-20">
          <img src={logo2} alt="Logo" className="w-full h-40" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-2 flex-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition ${isActive
                    ? "bg-zinc-700 text-white font-semibold"
                    : "hover:bg-zinc-800 text-zinc-200"
                  }`
                }
              >
                <link.icon size={20} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-40 pt-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md transition w-full hover:bg-blue-800 text-left cursor-pointer"
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
