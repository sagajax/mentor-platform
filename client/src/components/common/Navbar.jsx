// client/src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold tracking-wide text-indigo-400">
          MentorMatch
        </Link>
        <button
          className="text-2xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`
          md:flex md:items-center md:gap-6 md:static md:w-auto
          ${isMenuOpen ? 'absolute top-16 left-0 w-full bg-gray-800 z-10' : 'hidden'}`}
        >
          {user ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 md:py-0 hover:text-indigo-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/discovery"
                className="block px-4 py-2 md:py-0 hover:text-indigo-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Matches
              </Link>
              <Link
                to="/connections"
                className="block px-4 py-2 md:py-0 hover:text-indigo-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Connections
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 md:py-0 hover:text-indigo-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="block px-4 py-2 md:py-0 hover:text-indigo-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
