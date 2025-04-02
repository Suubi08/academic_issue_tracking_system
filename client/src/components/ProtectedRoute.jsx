"use client"

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation()

  // Check if user is authenticated by looking for the token
  const isAuthenticated = !!localStorage.getItem("accessToken")

  // Get user role from localStorage
  const userRole = localStorage.getItem("role")

  // Log the current authentication state for debugging
  useEffect(() => {
    console.log("Protected Route Check:", {
      isAuthenticated,
      userRole,
      allowedRoles,
      path: location.pathname,
    })
  }, [isAuthenticated, userRole, allowedRoles, location])

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If roles are specified and user's role is not included, redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const roleRedirects = {
      admin: "/admin-dashboard",
      student: "/studentdashboard",
      lecturer: "/lecturer-dashboard",
      academic_registrar: "/registrar-dashboard",
    }

    return <Navigate to={roleRedirects[userRole] || "/login"} replace />
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />
}

export default ProtectedRoute

