import React from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const UserCard = ({ user }) => {
  const { user: currentUser } = useAuth();

  const sendConnectionRequest = async () => {
    try {
      await api.post('/connections/request', {
        recipientId: user._id
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
      <p className="text-gray-600 mb-2 capitalize">{user.role}</p>
      
      <div className="mb-4">
        <h4 className="font-medium">Skills</h4>
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

      <div className="mb-4">
        <h4 className="font-medium">Interests</h4>
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

      <p className="text-sm text-gray-600 mb-4">{user.bio}</p>

      {currentUser && currentUser._id !== user._id && (
        <button
          onClick={sendConnectionRequest}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send Connection Request
        </button>
      )}
    </div>
  );
};

export default UserCard;