// client/src/components/discovery/UserCard.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UserCard = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const sendConnectionRequest = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await api.post('/connections/request', {
        recipientId: user.user._id
      });

      setRequestSent(true);
    } catch (error) {
      console.error('Error sending connection request:', error);
      setError(error.response?.data?.message || 'Failed to send connection request');
    } finally {
      setIsLoading(false);
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

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {currentUser && user.user && currentUser._id !== user.user._id && (
        <button
          onClick={sendConnectionRequest}
          disabled={isLoading || requestSent}
          className={`w-full py-2 rounded transition-colors ${
            requestSent
              ? 'bg-green-500 text-white'
              : isLoading
              ? 'bg-gray-400 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isLoading 
            ? 'Sending...' 
            : requestSent 
            ? 'Request Sent' 
            : 'Send Connection Request'}
        </button>
      )}
    </div>
  );
};

export default UserCard;