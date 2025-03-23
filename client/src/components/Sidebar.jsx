import React from "react";
import {
  LayoutDashboard,
  AlertCircle,
  Bell,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "../utils/utils";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const navigation = [
    {
      name: "Admin Dashboard (AITS)",
      href: "/",
      icon: LayoutDashboard,
      current: true,
      description: "Overview of all system activities and metrics",
    },
    {
      name: "Issue Management",
      href: "/issue-management",
      icon: AlertCircle,
      current: false,
      description:
        "View, assign, and track academic issues with filters and search",
    },
    {
      name: "Notifications & Alerts",
      href: "/notifications",
      icon: Bell,
      current: false,
      description: "Receive updates on pending and resolved issues",
    },
    {
      name: "Reports & Analytics",
      href: "/reports",
      icon: BarChart3,
      current: false,
      description:
        "Generate insights on issue resolution and lecturer performance",
    },
    {
      name: "User Management",
      href: "/users",
      icon: Users,
      current: false,
      description: "Manage students, lecturers, and permissions",
    },
    {
      name: "System Settings",
      href: "/settings",
      icon: Settings,
      current: false,
      description: "Adjust preferences and monitor cloud deployment",
    },
  ];

  return (
    <>
      <>
        {/* Mobile sidebar backdrop */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
            "md:static md:h-screen"
          )}
        >
          <div className="flex items-center justify-center h-16 border-b border-indigo-800">
            <span className="text-xl font-bold">AITS ADMIN</span>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-indigo-800 text-white"
                      : "text-indigo-100 hover:bg-indigo-800"
                  )
                }
                title={item.description}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </>
    </>
  );
};

export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../assets/logo.svg";
// import {
//   LayoutDashboard,
//   FileWarning,
//   CheckCircle,
//   BarChart3,
//   Bell,
//   Settings,
//   User2Icon,
// } from "lucide-react";

// const Sidebar = ({ open, setOpen }) => {
//   return (
//     <>
//       {/* Mobile sidebar backdrop */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:static md:h-screen`}
//       >
//         <aside className="h-screen bg-blue-950 text-white p-6">
//           <div className="flex flex-col">
//             <div className="flex flex-col items-center mb-10 mt-15">
//               <img src={logo} alt="Logo" className="w-16 h-16" />
//               <h1 className="text-xl font-bold">AITS</h1>
//             </div>
//             <ul className="flex flex-col gap-2">
//               <li>
//                 <NavLink
//                   to="/dashboard"
//                   end
//                   className={({ isActive }) =>
//                     `flex items-center gap-2 px-4 py-2 rounded-md transition ${
//                       isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
//                     }`
//                   }
//                 >
//                   <LayoutDashboard size={20} />
//                   Admin Dashboard
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/issues"
//                   className={({ isActive }) =>
//                     `flex items-center gap-2 px-4 py-2 rounded-md transition ${
//                       isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
//                     }`
//                   }
//                 >
//                   <FileWarning size={20} />
//                   Issue Management
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/resolved"
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-md transition ${
//                       isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
//                     }`
//                   }
//                 >
//                   <Bell size={20} className="mr-2" />
//                   Notifications & Alerts
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/reports"
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-md transition ${
//                       isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
//                     }`
//                   }
//                 >
//                   <BarChart3 size={20} className="mr-2" />
//                   Reports & Analysis
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/settings"
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-md transition ${
//                       isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
//                     }`
//                   }
//                 >
//                   <User2Icon size={20} className="mr-2" />
//                   User Management
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/settings"
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-md transition ${
//                       isActive ? "bg-blue-700 text-white" : "hover:bg-blue-800"
//                     }`
//                   }
//                 >
//                   <Settings size={20} className="mr-2" />
//                   System Settings
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
