import React from 'react';
import UserList from '../components/discovery/UserList';

const Discovery = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Your Match</h1>
      <UserList />
    </div>
  );
};

export default Discovery;