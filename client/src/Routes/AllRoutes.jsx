import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../Layout/Layout"
import IssueDetail from "../pages/StudentDashboard/[id]/page"
import RegistrarDashboard from "../pages/registrar-dashboard/page"
// import {
//   Issues,
//   Reports,
//   Settings,
//   Studentdashboard,
//   Issuereport,
// } from "../pages/";
import Login from "../Auth/Login"
import Signup from "../Auth/Signup"
import ProtectedRoute from "../components/ProtectedRoute"
import { AdminDashboard, LecturerDashboard, PageNotFound, Studentdashboard } from "../Hello"
import {
  Lecturerissuemanagement,
  LecturerNotifications,
  Adminissuemanagement,
  Adminsettings,
  AdminReports,
  AdminNotifications,
  Adminusermanagement,
  Lecturerstatusupdates,
  Lecturersettings,
  Studentissues,
  Studentsubmitissue,
  Studentsettings,
} from "../features"

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Redirect root to login if not authenticated */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route element={<Layout />}>
          <Route path="/studentdashboard" element={<Studentdashboard />} />
          <Route path="/studentissues" element={<Studentissues />} />
          <Route path="/submitissue" element={<Studentsubmitissue />} />
          {/* <Route path="/studentissuereport" element={<Studentissuereport />} /> */}
          <Route path="/studentsettings" element={<Studentsettings />} />
          <Route path="/studentissues/:id" element={<IssueDetail />} />
        </Route>
      </Route>

      {/* Lecturer Routes */}
      <Route element={<ProtectedRoute allowedRoles={["lecturer"]} />}>
        <Route element={<Layout />}>
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route path="/issuemanagement" element={<Lecturerissuemanagement />} />
          <Route path="/status-update" element={<Lecturerstatusupdates />} />
          <Route path="/lecturernotifications" element={<LecturerNotifications />} />
          <Route path="/lecturersettings" element={<Lecturersettings />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<Layout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/adminIssuemanagement" element={<Adminissuemanagement />} />
          <Route path="/admin-usermanagement" element={<Adminusermanagement />} />
          <Route path="/admin-notifications" element={<AdminNotifications />} />
          <Route path="/admin-reports" element={<AdminReports />} />
          <Route path="/admin-setting" element={<Adminsettings />} />
        </Route>
      </Route>

      {/* Academic Registrar Routes */}
      <Route element={<ProtectedRoute allowedRoles={["academic_registrar"]} />}>
        <Route element={<Layout />}>
          <Route path="/registrar-dashboard" element={<RegistrarDashboard />} />
          <Route path="/issues" element={<Studentissues />} />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/notifications" element={<AdminNotifications />} />
          <Route path="/settings" element={<Adminsettings />} />
        </Route>
      </Route>

      {/* Catch-all 404 route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AllRoutes

