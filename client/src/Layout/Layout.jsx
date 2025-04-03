"use client";

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { admin_Sidebar as AdminSidebar } from "../components";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || "student";

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Verify authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    // If token doesn't exist or is expired, redirect to login
    if (!token || (tokenExpiry && new Date(tokenExpiry) < new Date())) {
      // Clear any existing auth data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("tokenExpiry");

      navigate("/login");
    }
  }, [navigate]);

  // Get the current page title based on the path
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes("/studentdashboard")) return "Student Dashboard";
    if (path.includes("/admin-dashboard")) return "Admin Dashboard";
    if (path.includes("/lecturer-dashboard")) return "Lecturer Dashboard";
    if (path.includes("/registrar-dashboard")) return "Registrar Dashboard";
    if (path.includes("/issues")) return "My Issues";
    if (path.includes("/issuereport")) return "Report Issue";
    if (path.includes("/reports")) return "Reports & Analysis";
    if (path.includes("/settings")) return "Settings & Profile";

    return "Dashboard";
  };

  // Get the current page description
  const getPageDescription = () => {
    const path = location.pathname;

    if (path.includes("/studentdashboard"))
      return "Overview of your academic issues";
    if (path.includes("/admin-dashboard")) return "Admin system overview";
    if (path.includes("/lecturer-dashboard"))
      return "Lecturer dashboard overview";
    if (path.includes("/registrar-dashboard"))
      return "Registrar dashboard overview";
    if (path.includes("/issues"))
      return "Track and manage all your academic issues";
    if (path.includes("/issuereport"))
      return "Submit a new academic issue for resolution";
    if (path.includes("/reports"))
      return "View statistics and trends for academic issues";
    if (path.includes("/settings"))
      return "Manage your account settings and preferences";

    return "";
  };

  // Determine if we should show the back button
  const shouldShowBackButton = () => {
    const path = location.pathname;
    return path.includes("/issuereport") || path.includes("/settings");
  };

  // Determine if we should show the report button
  const shouldShowReportButton = () => {
    const path = location.pathname;
    return (
      !path.includes("/issuereport") &&
      !path.includes("/settings") &&
      userRole === "student"
    );
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 transparent bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-screen`}
      >
        {userRole === "admin" || userRole === "academic_registrar" ? (
          <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} role={userRole}/>
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          title={getPageTitle()}
          description={getPageDescription()}
          showBackButton={shouldShowBackButton()}
          showReportButton={shouldShowReportButton()}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
