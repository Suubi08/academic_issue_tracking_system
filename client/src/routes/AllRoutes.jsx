import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import {
  Dashboard,
  Reports,
  Settings,
  Issuemanagement,
  Usermanagement,
  Notifications,
} from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} Navigate={"/dashboard"}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route index element={<Dashboard />} />
        <Route path="issues" element={<Issuemanagement />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/users" element={<Usermanagement />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
