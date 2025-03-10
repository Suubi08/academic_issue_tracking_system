import React from "react";
import { FaBars, FaSearch,FaBell, FaUserCircle } from "react-icons/fa";


function Navbar() {
  return (
    <nav className="bg-blue-950 px-4 py-3 flex justify-between ml-64">
      <div className="flex items-center text-xl">
        <FaBars className="text-white me-4 cursor-pointer " />
        <span className="text-white font-semibold">Username</span> 
      </div>
      <div className="flex items-center gap-x-5 ">
        <div className="relative md:w-65 flex items-center">
          <span className="relativ md:absolute inset-y-0 left-0 flex items-center pl-">
            <button className="p-1 text-white focus:outline-none md:text-black">
              <FaSearch />
            </button> 
          </span>
          <input type="text" placeholder="Search here" id=""  className="w-full px-4 border-2 bg-white py-1 pl-12 rounded shadow  hidden md:block  outline-none text-gray-600" />
        </div>
         <div>< FaBell className="w-6 h-6 text-white"/></div>
         <div className="relative">
          <button className="text-white cursor-pointer group">
            <FaUserCircle className="w-6 h-6 mt-1"/>
            <div className="z-10 hidden absolute  rounded-lg shadow w-32 group-focus:block top-full bg-white right-0">
            <ul className="py-2 text-sm ">
            <li><a href="">Profile</a></li>
            <li><a href="">Settings</a></li>
            <li><a href="">Log Out</a></li>
          </ul>
            </div>
          </button>
         </div>
      </div>
    </nav>
  );
}

export default Navbar;
