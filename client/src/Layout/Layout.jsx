import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";

function Layout() {
  return (
    <div className="grid grid-cols-12 grid-rows-1 min-h-screen">
      <div className="col-span-2 bg-blue-800 text-white  min-h-full">
        <Sidebar />
      </div>
      <div className="col-span-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="col-span-10 bg-gray-100 p-1 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
