
import { LayoutDashboard, AlertCircle, Bell, BarChart3, Users, Settings } from "lucide-react";
import { cn } from "../utils/utils";
import { NavLink } from "react-router-dom";

const getNavigation = (userRole) => {
  const baseNavigation = [
    {
      name: "Admin Dashboard (AITS)",
      href: userRole === "admin" ? "/admin-dashboard" : "/registrar-dashboard",
      icon: LayoutDashboard,
      description: "Overview of all system activities and metrics",
    },
    {
      name: "Issue Management",
      href: userRole === "admin" ? "/admin-Issuemanagement" : "/issues",
      icon: AlertCircle,
      description: "View, assign, and track academic issues with filters and search",
    },
    {
      name: "Notifications & Alerts",
      href: userRole === "admin" ? "/admin-Notifications" : "/notifications",
      icon: Bell,
      description: "Receive updates on pending and resolved issues",
    },
    {
      name: "System Settings",
      href: "/settings",
      icon: Settings,
      description: "Adjust preferences and monitor cloud deployment",
    },
  ];

  const adminNavigation = [
    {
      name: "Reports & Analytics",
      href: "/admin-reports",
      icon: BarChart3,
      description: "Generate insights on issue resolution and lecturer performance",
    },
    {
      name: "User Management",
      href: "/admin-Issuemanagement",
      icon: Users,
      description: "Manage students, lecturers, and permissions",
    },
  ];

  return userRole === "admin" ? baseNavigation.concat(adminNavigation) : baseNavigation;
};

const Sidebar = ({ open, setOpen, userRole }) => {
  const navigation = getNavigation(userRole);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={() => setOpen(false)} />} 
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:h-screen"
        )}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-center h-16 border-b border-indigo-800">
          <span className="text-xl font-bold">
            {userRole === "admin" ? "AITS Admin" : "AITS Academic Registrar"}
          </span>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-md",
                  isActive ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-800"
                )
              }
              title={item.description}
              aria-label={item.name}
            >
              <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
