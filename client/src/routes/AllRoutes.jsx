import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import {
  Issues,
  Reports,
  Settings,
  Studentdashboard,
  Issuereport,
} from "../pages/";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  AdminDashboard,
  LecturerDashboard,
  PageNotFound,
} from "../pages/LecturerDashboard";
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
  Studentnotifications,
  Studentresolvedissues,
  Studentsubmitissue,
  Studentsettings,
} from "../features";

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
          <Route path="/issues" element={<Issues />} />
          <Route path="/issuereport" element={<Issuereport />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Lecturer Routes */}
      <Route element={<ProtectedRoute allowedRoles={["lecturer"]} />}>
        <Route element={<Layout />}>
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route
            path="/issuemanagement"
            element={<Lecturerissuemanagement />}
          />
          <Route
            path="/lecturernotifications"
            element={<LecturerNotifications />}
          />
          <Route path="/lecturersettings" element={<Lecturersettings />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<Layout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/adminIssuemanagement"
            element={<Adminissuemanagement />}
          />
          <Route path="/adminNotifications" element={<AdminNotifications />} />
          <Route path="/adminreports" element={<AdminReports />} />
          <Route path="/adminsettings" element={<Adminsettings />} />
        </Route>
      </Route>

      {/* Academic Registrar Routes */}
      <Route element={<ProtectedRoute allowedRoles={["academic_registrar"]} />}>
        <Route element={<Layout />}>
          <Route path="/registrar-dashboard" element={<AdminDashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all 404 route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
