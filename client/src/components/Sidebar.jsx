import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { LayoutDashboard, Settings,FileWarning,CheckCircle ,BarChart3} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed w-64 h-screen bg-blue-950 text-white p-6">
      <nav className="flex flex-col gap-6 ">
        <div className="flex flex-col items-center mb-10 mt-15 ">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h1 className="text-xl font-bold">AITS</h1>
        </div>
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink to="/studentdashboard" end className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
              }`
            }>              <LayoutDashboard size={20} />
              Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/myissues" className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
              }`
            }>
                            <FileWarning size={20} />
                            My Issues</NavLink>
          </li>
          <li>
            <NavLink to="/resolved_issues" className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
              }`
            }>               <CheckCircle size={20} />
Resolved Issues</NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) =>
              `flex items-center gap-2  px-4 py-2 rounded-md transition ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
              }`}>               <BarChart3 size={20} />
Reports & Analysis</NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition  ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
              }`}><Settings size={20} />Settings and Profile</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
