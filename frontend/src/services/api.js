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
  
  login: async (credentials) => {
    const data = await request('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    });
    
    // Сохраняем токен в localStorage после успешного входа
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      console.log('✅ Token saved to localStorage');
    } else {
      console.warn('⚠️ No token in login response', data);
    }
    
    return data;
  }
};

// Places endpoints (supports yurt, topchan, and more)
export const places = {
  // Get all places with optional filters
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append('type', params.type);     // 'yurt' or 'topchan'
    if (params.search) queryParams.append('search', params.search);
    if (params.regionId) queryParams.append('regionId', params.regionId);
    const query = queryParams.toString();
    return request(`/places${query ? `?${query}` : ''}`);
  },
  
  // Get yurts only (convenience method)
  getYurts: () => request('/places?type=yurt'),
  
  // Get topchans only (convenience method)
  getTopchans: () => request('/places?type=topchan'),
  
  // Get single place by ID
  getById: (id) => request(`/places/${id}`),
  
  // Get all regions
  getRegions: () => request('/regions'),
  
  // Check availability for a place
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