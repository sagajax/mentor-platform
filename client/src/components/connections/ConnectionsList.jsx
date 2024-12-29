// client/src/components/connections/ConnectionsList.jsx
import React, { useState, useEffect } from 'react';
import { getConnections } from '../../services/api';

const ConnectionsList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await getConnections();
        setConnections(response.data.filter(conn => conn.status === 'accepted'));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch connections');
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) return <div>Loading connections...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Connections</h2>
      {connections.length === 0 ? (
        <p>No active connections found.</p>
      ) : (
        <div className="grid gap-4">
          {connections.map((connection) => (
            <div key={connection._id} className="p-4 border rounded-lg shadow">
              <div className="font-semibold">
                Mentor: {connection.mentor.email}
              </div>
              <div className="font-semibold">
                Mentee: {connection.mentee.email}
              </div>
              <div className="text-gray-600">
                Status: {connection.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionsList;