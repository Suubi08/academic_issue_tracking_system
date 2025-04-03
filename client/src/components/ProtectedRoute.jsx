import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  // Memoized authentication and role retrieval
  const isAuthenticated = useMemo(() => !!localStorage.getItem("accessToken"), []);
  const userRole = useMemo(() => localStorage.getItem("role"), []);

  // Debugging log (only runs when location changes)
  useEffect(() => {
    console.log("ProtectedRoute Debug:", {
      isAuthenticated,
      userRole,
      allowedRoles,
      currentPath: location.pathname,
    });
  }, [location.pathname]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
