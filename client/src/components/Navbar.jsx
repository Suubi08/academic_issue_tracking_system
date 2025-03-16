import React from "react";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-gray-700 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-semibold text-lg">Username</div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            id="search"
            placeholder="Search...."
            className="bg-white outline-none text-white placeholder-gray-400 pl-8 pr-4 py-2 w-full rounded-lg"
          />
          <button>
            <FaSearch className="w-6 h-6 text-black " />
          </button>
          {/* //absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} */}
        </div>
        <div>
          <button>
            <FaBell className="w-6 h-6 text-white" />
          </button>
          <button>
            <FaCog className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
