import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-12 md:grid-rows-1">
      <div
        className={`md:col-span-2 ${sidebarOpen ? "block" : "hidden"} md:block`}
      >
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      <div className="flex-1 md:col-span-10 flex flex-col">
        <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
