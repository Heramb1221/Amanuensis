import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText } from 'react-icons/fi';
import logo from '../Notes.png'

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <img src={logo} alt="Pastes Logo" className="h-10 w-10"/>
      <div className="flex gap-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
      <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg">
        Amanuensis
      </p>
      <p className="mt-3 text-lg text-gray-500 italic">– A cozy place for all your notes.</p>
      </div>
      <div className="flex gap-6">
        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition duration-200 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`
          }
        >
          <FiHome /> Home
        </NavLink>
        <NavLink
          to='/pastes'
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-lg transition duration-200 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}`
          }
        >
          <FiFileText /> Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;