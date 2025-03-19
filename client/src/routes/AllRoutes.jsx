import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Dashboard, Issues, Resolved, Reports, Settings } from "../pages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="issues" element={<Issues />} />
        <Route path="resolved" element={<Resolved />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
