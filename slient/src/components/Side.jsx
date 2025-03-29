import React from "react";
import { NavLink } from "react-router-dom";
//import logo from "../assets/logo.svg";
import {
  LayoutDashboard,
  Settings,
  FileWarning,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const Side = () => {
  return (
    <aside className=" h-screen bg-blue-950 text-white p-6 static">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center mb-10 mt-15 ">
          <img src="" alt="Logo" className="w-16 h-16" />
          <h1 className="text-xl font-bold">AITS</h1>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/studentdashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/issues"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <FileWarning size={20} />
              My Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resolved"
              className={({ isActive }) =>
                `flex items-center  px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <CheckCircle size={20} className="mr-2" />
              Resolved Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `flex items-center  px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              {" "}
              <BarChart3 size={20} className="mr-2" />
              Reports & Analysis
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center  px-4 py-2 rounded-md transition  ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                }`
              }
            >
              <Settings size={20} className="mr-2" />
              Settings and Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Side;