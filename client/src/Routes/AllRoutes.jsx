import { Route,Routes } from "react-router-dom";
import { Auth,Dashboard } from "../pages";

import React from 'react'

const AllRoutes = () => {
  return (
    <>
        <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={ <Dashboard />} />
        </Route>
      </Routes>
    </>
)
}

export default AllRoutes;