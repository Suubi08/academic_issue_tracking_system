import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
// import {
//   Issues,
//   Reports,
//   Settings,
//   Studentdashboard,
//   Issuereport,
// } from "../pages/";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import IssueDetail from "../pages/id/IssueDetail";
// import Auth from "../Auth/Auth";
import ProtectedRoute from "../components/ProtectedRoute";

import {
  AdminDashboard,
  LecturerDashboard,
  Studentdashboard,
  RegistrarDashboard,
} from "../pages";

import {
  Lecturerissuemanagement,
  LecturerNotifications,
  Adminissuemanagement,
  Adminsettings,
  AdminReports,
  AdminNotifications,
  Lecturerstatusupdates,
  Lecturersettings,
  Studentissues,
  Studentsubmitissue,
  Studentsettings,
  RegistrarNotifications,
  RegistrarSettings,
  RegistrarIssueAction,
  LecturerIssueDetails,
  NotificationDetails,
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
          <Route path="/student-dashboard" element={<Studentdashboard />} />
          <Route path="/studentissues" element={<Studentissues />} />
          <Route path="/submitissue" element={<Studentsubmitissue />} />
          <Route path="/viewissue/:id" element={<IssueDetail />} />
          {/* <Route path="/studentissuereport" element={<Studentissuereport />} /> */}
          <Route path="/studentsettings" element={<Studentsettings />} />
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
            path="/lecturer-issue-details/:id"
            element={<LecturerIssueDetails />}
          />
          <Route path="/status-update" element={<Lecturerstatusupdates />} />
          <Route
            path="/lecturernotifications"
            element={<LecturerNotifications />}
          />
          <Route
            path="/lecturer-notification-details/:id"
            element={<NotificationDetails />}
          />
          <Route path="/lecturersettings" element={<Lecturersettings />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<Layout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/adminissuemanagement"
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
          <Route path="/registrar-dashboard" element={<RegistrarDashboard />} />
          <Route
            path="/registrarNotifications"
            element={<RegistrarNotifications />}
          />
          <Route path="/registrarSettings" element={<RegistrarSettings />} />
          <Route
            path="/registrarissueaction"
            element={<RegistrarIssueAction />}
          />
        </Route>
      </Route>
      {/* Catch-all 404 route */}
    </Routes>
  );
};

export default AllRoutes;
