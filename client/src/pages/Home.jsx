
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to MentorMatch</h1>
        <p className="text-xl mb-8">Connect with mentors and mentees in your field</p>
        
        {!user ? (
          <div className="space-x-4">
            <Link 
              to="/auth" 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <Link 
            to="/discovery" 
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Find Matches
          </Link>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">For Mentors</h2>
          <p>Share your experience and guide others in their professional journey</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">For Mentees</h2>
          <p>Connect with experienced professionals and accelerate your growth</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Smart Matching</h2>
          <p>Find the perfect mentor-mentee match based on skills and interests</p>
        </div>
      </div>
    </div>
  );
};

export default Home;


