
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    skills: '',
    availability: ''
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/profile/search', { params: filters });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Search Filters</h2>
        <div className="flex gap-4">
          <select
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="">All Roles</option>
            <option value="mentor">Mentors</option>
            <option value="mentee">Mentees</option>
          </select>
          <input
            type="text"
            placeholder="Skills"
            value={filters.skills}
            onChange={(e) => setFilters({...filters, skills: e.target.value})}
            className="p-2 border rounded"
          />
          <select
            value={filters.availability}
            onChange={(e) => setFilters({...filters, availability: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="">Any Availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="weekends">Weekends</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;