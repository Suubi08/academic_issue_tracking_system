"use client";

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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

    if (!token || (tokenExpiry && new Date(tokenExpiry) < new Date())) {
      // Clear any existing auth data
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // Route configuration for titles and descriptions
  const routeConfig = {
    "/studentdashboard": {
      title: "Student Dashboard",
      description: "Overview of your academic issues",
    },
    "/admin-dashboard": {
      title: "Admin Dashboard",
      description: "Admin system overview",
    },
    "/lecturer-dashboard": {
      title: "Lecturer Dashboard",
      description: "Lecturer dashboard overview",
    },
    "/registrar-dashboard": {
      title: "Registrar Dashboard",
      description: "Registrar dashboard overview",
    },
    "/issues": {
      title: "My Issues",
      description: "Track and manage all your academic issues",
    },
    "/issuereport": {
      title: "Report Issue",
      description: "Submit a new academic issue for resolution",
    },
    "/reports": {
      title: "Reports & Analysis",
      description: "View statistics and trends for academic issues",
    },
    "/settings": {
      title: "Settings & Profile",
      description: "Manage your account settings and preferences",
    },
  };

  const getPageTitle = () =>
    routeConfig[location.pathname]?.title || "Dashboard";
  const getPageDescription = () =>
    routeConfig[location.pathname]?.description || "";

  // Determine if we should show specific buttons
  const shouldShowBackButton =
    location.pathname.includes("/issuereport") ||
    location.pathname.includes("/settings");
  const shouldShowReportButton =
    !location.pathname.includes("/issuereport") &&
    !location.pathname.includes("/settings") &&
    userRole === "student";

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`
          bg-zinc-900 text-white w-64
          fixed inset-y-0 left-0 z-40
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:z-auto
        `}
      >
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-200 md:ml-0">
        <Navbar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          title={getPageTitle()}
          description={getPageDescription()}
          showBackButton={shouldShowBackButton}
          showReportButton={shouldShowReportButton}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
