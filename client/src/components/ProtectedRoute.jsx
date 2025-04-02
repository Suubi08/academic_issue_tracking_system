"use client";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  // Check if user is authenticated by looking for the token
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // Get user role from localStorage
  const userRole = localStorage.getItem("role");

  // Log the current authentication state for debugging
  useEffect(() => {
    console.log("ProtectedRoute Debug:", {
      isAuthenticated,
      userRole,
      allowedRoles,
      currentPath: location.pathname,
    });
  }, [isAuthenticated, userRole, allowedRoles, location]);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user's role is not included, redirect to the appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
