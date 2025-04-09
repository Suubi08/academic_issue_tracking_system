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
  PageNotFound,
  Studentdashboard,
  RegistrarDashboard
} from "../pages";

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
  RegistrarNotifications,
  RegistrarSettings,
} from "../features";


const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Redirect root to login if not authenticated */}
      <Route path="/" element={<Navigate to="/login" replace />} />

