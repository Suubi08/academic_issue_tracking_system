import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";

function Layout() {
  return (
    <div className="flex h-screen ">
        <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-1 md:p-1 bg-gray-50">
          <Outlet />
         
        </main>
      </div>
    </div>
  );
}

export default Layout;
