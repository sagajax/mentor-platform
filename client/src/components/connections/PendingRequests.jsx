// client/src/components/connections/PendingRequests.jsx
import React, { useState, useEffect } from 'react';
import { getPendingRequests, respondToConnection } from '../../services/api';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getPendingRequests();
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch pending requests');
      setLoading(false);
    }
  };

  const handleResponse = async (connectionId, status) => {
    try {
      await respondToConnection(connectionId, status);
      // Refresh the requests list
      fetchRequests();
    } catch (error) {
      setError('Failed to respond to request');
    }
  };

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request._id} className="p-4 border rounded-lg shadow">
              <div className="font-semibold">
                From: {request.mentee.email} (Mentee)
              </div>
              <div className="font-semibold">
                To: {request.mentor.email} (Mentor)
              </div>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleResponse(request._id, 'accepted')}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(request._id, 'rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;