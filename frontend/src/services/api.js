// Backend API client
const API_BASE = 'http://localhost:5000/api';

// Helper function for all API requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Debug log (F12 -> Console)
  console.log(`🌐 Request to ${endpoint}, Token: ${token ? "Present ✅" : "MISSING ❌"}`);

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: options.method || 'GET',
    headers: headers,
    ...options,
  };
  
  config.headers = headers;

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    
    if (!response.ok) {
      console.error(`❌ Backend error on ${endpoint}:`, data);
      throw new Error(data?.error || data?.message || `Request failed with status ${response.status}`);
    }
    
    return data;
  } catch (err) {
    console.error(`🚨 Network error on ${endpoint}:`, err.message);
    throw err;
  }
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
  getYurts: () => request('/places?type=yurt'),
  getTopchans: () => request('/places?type=topchan'),
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