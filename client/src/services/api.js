import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getConnections = () => {
  return api.get('/connections/my-connections');
};

export const getPendingRequests = () => {
  return api.get('/connections/pending-requests');
};

export const sendConnectionRequest = (recipientId) => {
  return api.post('/connections/request', { recipientId });
};

export const respondToConnection = (connectionId, status) => {
  return api.put(`/connections/respond/${connectionId}`, { status });
};


export default api;