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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Skills (comma-separated)</label>
        <input
          type="text"
          value={formData.skills}
          onChange={(e) => setFormData({...formData, skills: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Interests (comma-separated)</label>
        <input
          type="text"
          value={formData.interests}
          onChange={(e) => setFormData({...formData, interests: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Experience</label>
        <textarea
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Availability</label>
        <select
          value={formData.availability}
          onChange={(e) => setFormData({...formData, availability: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="weekends">Weekends</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;

