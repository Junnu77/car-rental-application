import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";
import { Car, LogOut, Menu, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-black/30 dark:bg-gray-900/30 backdrop-blur-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-6 w-6 md:h-8 md:w-8 text-emerald-500" />
              <span className="ml-2 text-xl md:text-2xl font-bold text-white">CARWALA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Home
            </Link>
            <Link to="/search" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Browse Cars
            </Link>
            <Link to="/deals" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Special Deals
            </Link>
            <Link to="/locations" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Locations
            </Link>
            <Link to="/support" className="text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                {user.isAdmin ? (
                  <Link to="/admin" className="flex items-center bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition-all">
                    <span className="ml-2">Admin</span>
                  </Link>
                ) : (
                  <Link to="/my-rentals" className="flex items-center text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-1 rounded-md transition-all">
                    <User className="h-5 w-5" />
                    <span className="ml-2">My Rentals</span>
                  </Link>
                )}
                <button onClick={handleLogOut} className="flex items-center bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all">
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline ml-2">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition-all">
                <User className="h-5 w-5" />
                <span className="hidden md:inline ml-2">Login</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900/95 rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                Home
              </Link>
              <Link to="/search" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                Browse Cars
              </Link>
              <Link to="/deals" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                Special Deals
              </Link>
              <Link to="/locations" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                Locations
              </Link>
              <Link to="/support" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                Support
              </Link>
              {user && (
                <>
                  {user.isAdmin ? (
                    <Link to="/admin" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link to="/my-rentals" className="block text-gray-200 font-semibold hover:text-white hover:bg-emerald-500/60 px-3 py-2 rounded-md transition-all">
                      My Rentals
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
