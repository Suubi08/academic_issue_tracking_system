import React from "react";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gray-300  p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-gray-800 font-bold text-lg">USERNAME</span>
          <span className="text-sm text-gray-500">Tue, 27 June 2024</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            id="search"
            placeholder="Search...."
            className="bg-white outline-none text-white placeholder-gray-400 pl-8 pr-4 py-2 w-full rounded-lg"
          />
          <button>
            <FaSearch className="w-6 h-6 text-gray-500 " />
          </button>
          {/* //absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} */}
        </div>
        <div>
          <p>Profile</p>
        </div>
        <div>
          <button>
            <FaBell className="w-6 h-6 text-black" />
          </button>
          <button>
            <FaCog className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
