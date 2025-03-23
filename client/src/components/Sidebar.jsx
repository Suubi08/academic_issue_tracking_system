import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  LayoutDashboard,
  FileWarning,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-screen`}
      >
        <aside className="h-screen bg-blue-950 text-white p-6">
          <div className="flex flex-col">
            <div className="flex flex-col items-center mb-10 mt-15">
              <img src={logo} alt="Logo" className="w-16 h-16" />
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
                  Submit Issue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/resolved"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md transition ${
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
                    `flex items-center px-4 py-2 rounded-md transition ${
                      isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                    }`
                  }
                >
                  <BarChart3 size={20} className="mr-2" />
                  Reports & Analysis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md transition ${
                      isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
                    }`
                  }
                >
                  {/* <FaCog size={20} className="mr-2" /> */}
                  Settings and Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
