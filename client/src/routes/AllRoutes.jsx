import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth"; // Update the path if necessary
import Dashboard from "../pages/Dashboard"; // Update the path if necessary
import ProtectedRoute from "../components/ProtectedRoute"; // Update the path if necessary

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;