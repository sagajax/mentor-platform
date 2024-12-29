// client/src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MentorMatch</Link>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/discovery">Find Matches</Link>
              <Link to="/connections">Connections</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;