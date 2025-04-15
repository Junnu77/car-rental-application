import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Car, Calendar, Users, Star, Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Cars", path: "/admin/cars", icon: Car },
    { name: "Rentals", path: "/admin/rentals", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-all duration-50 ${
        isOpen ? "w-64" : "w-20"
      } ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} shadow-md`}
    >
      <div className="flex items-center justify-between p-6">
        <h1 className={`text-xl font-bold transition-opacity duration-50 ${isOpen ? "opacity-100" : "opacity-0"}`}>
          Car Rental Admin
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm ${
                  location.pathname === item.path
                    ? theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className={`${isOpen ? "block" : "hidden"} transition-all duration-50`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-6">
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
            theme === "dark" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <span className="flex items-center">
            {theme === "dark" ? (
              <Sun className="w-5 h-5 mx-2 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 mx-2 text-gray-800" />
            )}
          </span>
          {/* Ensure the text is hidden only when the sidebar is collapsed */}
          {isOpen && <span className="transition-all duration-50">Toggle Theme</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;