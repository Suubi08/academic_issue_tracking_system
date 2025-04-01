"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  // Get the current page title based on the path
  const getPageTitle = () => {
    const path = location.pathname

    if (path.includes("/studentdashboard")) return "Dashboard"
    if (path.includes("/issues")) return "My Issues"
    if (path.includes("/issuereport")) return "Report Issue"
    if (path.includes("/reports")) return "Reports & Analysis"
    if (path.includes("/settings")) return "Settings & Profile"

    return "Dashboard"
  }

  // Get the current page description
  const getPageDescription = () => {
    const path = location.pathname

    if (path.includes("/studentdashboard")) return "Overview of your academic issues"
    if (path.includes("/issues")) return "Track and manage all your academic issues"
    if (path.includes("/issuereport")) return "Submit a new academic issue for resolution"
    if (path.includes("/reports")) return "View statistics and trends for academic issues"
    if (path.includes("/settings")) return "Manage your account settings and preferences"

    return ""
  }

  // Determine if we should show the back button
  const shouldShowBackButton = () => {
    const path = location.pathname
    return path.includes("/issuereport") || path.includes("/settings")
  }

  // Determine if we should show the report button
  const shouldShowReportButton = () => {
    const path = location.pathname
    return !path.includes("/issuereport") && !path.includes("/settings")
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-950 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-screen`}
      >
        <Sidebar username={localStorage.getItem("username") || "User"} />
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
  )
}

export default Layout

