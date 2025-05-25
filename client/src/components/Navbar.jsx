import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft, Bell, User, LogOut } from "lucide-react";
import { logout } from "../utils/authService";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

const Navbar = ({
  setSidebarOpen,
  sidebarOpen,
  title,
  description,
  showBackButton,
  showReportButton,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // const navigate = useNavigate();
  // const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const userRole = localStorage.getItem("role") || "student";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleReport = () => {
    navigate("/submitissue");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Back button (conditional) */}
            {showBackButton && (
              <button
                type="button"
                onClick={handleBack}
                className="ml-1 md:ml-0 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-1 hidden sm:inline">Back</span>
              </button>
            )}

            {/* Page title */}
            {/* <div className="ml-4">
              <h1 className="text-lg font-medium text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                {description}
              </p>
            </div> */}
            {/* Role info */}
            <div className="flex items-center gap-3">
              {username ? (
                <h1 className="text-lg font-medium">
                  Welcome to{" "}
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}'s
                  Dashboard
                </h1>
              ) : (
                <h1 className="text-lg font-medium">Welcome Guest</h1>
              )}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Report Issue button (conditional) */}
            {showReportButton && (
              <button
                type="button"
                onClick={handleReport}
                className="hidden sm:inline-flex items-center rounded-md  px-3 py-2 text-sm font-medium  shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white
"
              >
                Report Issue
              </button>
            )}

            {/* Notifications */}
            <button
              type="button"
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <User className="h-6 w-6" />
              </button>

              {/* Dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    <p className="font-medium">{username}</p>
                    <p className="text-gray-500 capitalize">
                      {localStorage.getItem("role") || "User"}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/settings");
                    }}
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <div className="flex items-center text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
