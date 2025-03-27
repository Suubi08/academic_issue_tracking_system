import React from "react";
import { FaHome, FaBook, FaChartBar, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">AITS</h1>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
          <FaHome /> <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
          <FaBook /> <span>My Issues</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
          <FaChartBar /> <span>Reports</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
          <FaCog /> <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
