import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../Layout/Layout"
import { Issues, Reports, Settings, Studentdashboard, Issuereport } from "../pages"
import Login from "../pages/Auth/Login"
import Signup from "../pages/Auth/Signup"
import ProtectedRoute from "../components/ProtectedRoute"

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes (wrapped in Layout) */}
      <Route element={<ProtectedRoute allowedRoles={["student", "admin", "lecturer", "academic_registrar"]} />}>
        <Route element={<Layout />}>
          {/* Redirect root to studentdashboard */}
          <Route path="/" element={<Navigate to="/studentdashboard" replace />} />

          {/* Student Routes */}
          <Route path="/studentdashboard" element={<Studentdashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issuereport" element={<Issuereport />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all 404 route */}
      <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 Not Found</h1>} />
    </Routes>
  )
}

export default AllRoutes

