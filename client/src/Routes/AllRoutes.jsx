import { Route, Routes } from "react-router-dom";
import { Auth, Dashboard ,Issue,Reports,Resolved ,Studentdashboard} from "../pages";

import React from 'react'
import { ProtectedRoute } from "../components";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} /></Route>
                <Route path="studentdashboard" element={<Studentdashboard/>} ></Route>
                <Route path="myissues" element={<Issue/>} ></Route>
                <Route path="resolved_issues" element={<Resolved/>} ></Route>
                <Route path="reports" element={<Reports/>} ></Route>
                
            </Routes>
        </>
    )
}

export default AllRoutes;