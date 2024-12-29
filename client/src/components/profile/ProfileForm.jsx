// client/src/components/profile/ProfileForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    interests: '',
    experience: '',
    availability: 'full-time'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        setFormData({
          ...data,
          skills: data.skills.join(', '),
          interests: data.interests.join(', ')
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        interests: formData.interests.split(',').map(interest => interest.trim())
      };
      await api.post('/profile', profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Your Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write a short bio about yourself"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Skills (comma-separated)</label>
        <input
          type="text"
          value={formData.skills}
          onChange={(e) => setFormData({...formData, skills: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="E.g., JavaScript, React, Node.js"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Interests (comma-separated)</label>
        <input
          type="text"
          value={formData.interests}
          onChange={(e) => setFormData({...formData, interests: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="E.g., Web Development, AI, Design"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Experience</label>
        <textarea
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Describe your professional experience"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Availability</label>
        <select
          value={formData.availability}
          onChange={(e) => setFormData({...formData, availability: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="weekends">Weekends</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        onClick={() => alert('Profile updated successfully!')}
      >
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
