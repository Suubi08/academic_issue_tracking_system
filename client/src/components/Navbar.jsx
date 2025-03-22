import React, { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);

  const toggleSearch = () => setSearchActive(!searchActive);

  return (
    <nav className="bg-gray-300 p-4 shadow-md fixed z-[1] w-[83%] top-0">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section (Username & Date) */}
        <div className="flex flex-col">
          <span className="text-gray-800 font-bold text-lg">USERNAME</span>
          <span className="text-sm text-gray-500">Tue, 27 June 2024</span>
        </div>

        {/* Middle Section (Search Bar) */}
        <div className="flex items-center space-x-4 relative">
          <button
            onClick={toggleSearch}
            className="p-1 text-black focus:outline-none md:hidden"
          >
            <FaSearch />
          </button>
          <input
            type="text"
            id="search"
            placeholder="Search...."
            className={`px-4 py-1 pl-12 rounded shadow outline-none transition-all duration-300 ease-in-out ${
              searchActive ? "block" : "hidden"
            } md:block`}
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <FaSearch className="text-gray-600" />
          </span>
        </div>

        {/* Right Section (Notifications & Logout) */}
        <div className="flex items-center justify-center">
          <button className="mr-4">
            <FaBell className="w-6 h-6 text-black" />
          </button>
          <button className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-4xl">
            LogOut
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
