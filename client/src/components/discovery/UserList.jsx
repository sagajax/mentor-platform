// client/src/components/discovery/UserList.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    role: '',
    skills: '',
    availability: ''
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      // Create query string only for non-empty filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const { data } = await api.get(`/profile/search?${queryParams}`);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Roles</option>
            <option value="mentor">Mentors</option>
            <option value="mentee">Mentees</option>
          </select>
          
          <input
            type="text"
            placeholder="Skills (e.g., JavaScript, Python)"
            value={filters.skills}
            onChange={(e) => handleFilterChange('skills', e.target.value)}
            className="p-2 border rounded min-w-[200px]"
          />
          
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Any Availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="weekends">Weekends</option>
          </select>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-600">No users found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;