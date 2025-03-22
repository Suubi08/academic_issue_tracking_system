import { Menu, Search } from "lucide-react";
import React from "react";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";

const Navbar = ({ SetSidebarOpen }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <nav className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="btn "
              onClick={() => SetSidebarOpen(true)}
            >
              <span>Open sidebar</span>
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <div>
              <h1 className="h1_navbar">ADMIN</h1>
              <p className="p-nav">{getCurrentDate()}</p>
            </div>
          </div>
          <div className="flex items-center relative">
            <div className="max-w-xs w-full">
              <div className="absolute flex items-center left-0 pl-3 pointer-events-none inset-y-0">
                <Search className="w-6 h-6  text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search here"
                className="input_nav"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
