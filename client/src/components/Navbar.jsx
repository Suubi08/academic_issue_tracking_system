import React from "react";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gray-300  p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-gray-800 font-bold text-lg">USERNAME</span>
          <span className="text-sm text-gray-500">Tue, 27 June 2024</span>
        </div>
        <div className="flex items-center space-x-4 relative  ">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="focus:outline-none p-1 text-white md:text-black">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            id="search"
            placeholder="Search...."
            className="px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
          />
        </div>
        <div>
          <p>Profile</p>
        </div>
        <div className="flex items-center justify-center">
          <button className="mr-4">
            <FaBell className="w-6 h-6 text-black" />
          </button>
          <button className="bg-gray-900 text-white font-semibold p-2 rounded-4xl">
            LogOut
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
