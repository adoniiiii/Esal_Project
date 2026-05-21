// Backend API client
const API_BASE = 'http://localhost:5000/api';

// Helper function for all API requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
  
  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  return data;
};

// Auth endpoints
export const auth = {
  register: (userData) => request('/auth/register', { 
    method: 'POST', 
    body: JSON.stringify(userData) 
  }),
  login: (credentials) => request('/auth/login', { 
    method: 'POST', 
    body: JSON.stringify(credentials) 
  })
};

// Places endpoints
export const places = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append('type', params.type);
    if (params.search) queryParams.append('search', params.search);
    if (params.regionId) queryParams.append('regionId', params.regionId);
    const query = queryParams.toString();
    return request(`/places${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/places/${id}`),
  getRegions: () => request('/regions'),
  getAvailability: (id, from, to) => request(`/places/${id}/availability?from=${from}&to=${to}`)
};

// Bookings endpoints
export const bookings = {
  create: (bookingData) => request('/bookings', { 
    method: 'POST', 
    body: JSON.stringify(bookingData) 
  }),
  getMyBookings: () => request('/bookings/users/me/bookings'),
  cancel: (id) => request(`/bookings/${id}`, { method: 'DELETE' })
};

// Chatbot endpoint
export const chatbot = {
  sendMessage: (message) => request('/chatbot/message', { 
    method: 'POST', 
    body: JSON.stringify({ message }) 
  })
};

// Health check
export const health = () => request('/health');