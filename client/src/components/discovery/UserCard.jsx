
import React from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UserCard = ({ user }) => {
  const { user: currentUser } = useAuth();

  const sendConnectionRequest = async () => {
    try {
      await api.post('/connections/request', {
        recipientId: user.user._id // Updated to access user ID from nested user object
      });
      alert('Connection request sent successfully!');
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('Failed to send connection request');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
      <p className="text-gray-600 mb-2 capitalize">{user.user?.role || 'User'}</p>
      
      {user.bio && (
        <p className="text-sm text-gray-600 mb-4">{user.bio}</p>
      )}

      {user.skills && user.skills.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-700">Skills</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {user.interests && user.interests.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm text-gray-700">Interests</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {user.availability && (
        <p className="text-sm text-gray-600 mb-4">
          Availability: <span className="capitalize">{user.availability}</span>
        </p>
      )}

      {currentUser && user.user && currentUser._id !== user.user._id && (
        <button
          onClick={sendConnectionRequest}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Send Connection Request
        </button>
      )}
    </div>
  );
};

export default UserCard;