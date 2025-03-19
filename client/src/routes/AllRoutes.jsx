import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
