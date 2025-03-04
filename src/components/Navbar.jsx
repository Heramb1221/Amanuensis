import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText, FiMenu, FiX } from 'react-icons/fi';
import logo from '../Notes.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Pastes Logo" className="h-10 w-10" />
        <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">
          Amanuensis
        </p>
      </div>

      {/* Navigation links (Desktop) */}
      <div className="hidden md:flex gap-6">
        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition duration-200 ${
              isActive ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`
          }
        >
          <FiHome /> Home
        </NavLink>
        <NavLink
          to='/pastes'
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition duration-200 ${
              isActive ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`
          }
        >
          <FiFileText /> Pastes
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-gray-900 dark:text-gray-100 focus:outline-none"
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden flex flex-col items-center gap-4 p-4">
          <NavLink
            to='/'
            onClick={() => setMenuOpen(false)}
            className="w-full flex items-center gap-2 justify-center py-2 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <FiHome /> Home
          </NavLink>
          <NavLink
            to='/pastes'
            onClick={() => setMenuOpen(false)}
            className="w-full flex items-center gap-2 justify-center py-2 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <FiFileText /> Pastes
          </NavLink>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
