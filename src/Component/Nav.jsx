// Filename: Nav.jsx
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Authcontext } from "../context/Authcontext";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, LogOut } = useContext(Authcontext);

  const handleLogout = () => {
    LogOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-800 to-green-900 text-white font-semibold shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          🌱 Krishi<span className="text-yellow-400">Link</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-lg">
          <li>
            <NavLink to="/" className="hover:text-yellow-400 transition">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allcrops"
              className="hover:text-yellow-400 transition"
            >
              All Crops
            </NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink
                  to="/addcrop"
                  className="hover:text-yellow-400 transition"
                >
                  Add Crop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myposts"
                  className="hover:text-yellow-400 transition"
                >
                  My Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myinterests"
                  className="hover:text-yellow-400 transition"
                >
                  My Interests
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-yellow-400 transition"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="hover:text-yellow-400 transition"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Profile / Mobile Menu Button */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="hidden lg:block">
                  {user.displayName || "User"}
                </span>
                <div className="w-10 h-10 rounded-full border-2 border-yellow-400 overflow-hidden">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 bg-green-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
                <ul className="p-2 w-40 text-sm">
                  <li>
                    <NavLink
                      to="/updateprofile"
                      className="block py-2 px-3 hover:bg-green-800 rounded-md"
                    >
                      Update Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-3 hover:bg-green-800 rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-green-900 border-t border-green-700 flex flex-col gap-3 px-6 py-4"
          >
            <NavLink
              to="/"
              className="hover:text-yellow-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/allcrops"
              className="hover:text-yellow-400 transition"
              onClick={() => setIsOpen(false)}
            >
              All Crops
            </NavLink>

            {user ? (
              <>
                <NavLink to="/addcrop" onClick={() => setIsOpen(false)}>
                  Add Crop
                </NavLink>
                <NavLink to="/myposts" onClick={() => setIsOpen(false)}>
                  My Posts
                </NavLink>
                <NavLink to="/myinterests" onClick={() => setIsOpen(false)}>
                  My Interests
                </NavLink>
                <NavLink to="/updateprofile" onClick={() => setIsOpen(false)}>
                  Update Profile
                </NavLink>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
