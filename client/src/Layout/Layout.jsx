import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";

function Layout() {
  return (
    <div className="flex h-screen ">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <Navbar />
        <main className="col-span-10 bg-gray-100 p-1 flex-1 my-18">
          <Outlet />
          <div>
          {
            ([1,2,3,4,5]).map((x,i) => <span className="my-16 relative block">{i}</span>)
          }</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
