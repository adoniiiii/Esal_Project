const API_BASE = 'http://localhost:5000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
  
  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

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

export const places = {
  getAll: (params = {}) => request(`/places?${new URLSearchParams(params)}`),
  getById: (id) => request(`/places/${id}`),
  getAvailability: (id, from, to) => request(`/places/${id}/availability?from=${from}&to=${to}`)
};

export const bookings = {
  create: (bookingData) => request('/bookings', { 
    method: 'POST', 
    body: JSON.stringify(bookingData) 
  }),
  getMyBookings: () => request('/users/me/bookings'),
  cancel: (id) => request(`/bookings/${id}`, { method: 'DELETE' })
};