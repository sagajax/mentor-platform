// client/src/pages/Connections.jsx
import React from 'react';
import ConnectionsList from '../components/connections/ConnectionsList';
import PendingRequests from '../components/connections/PendingRequests';

const Connections = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Connections</h1>
      <div className="space-y-8">
        <PendingRequests />
        <ConnectionsList />
      </div>
    </div>
  );
};

export default Connections;