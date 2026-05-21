// Mock API - no real backend calls
const API_BASE = 'http://localhost:5000/api';

// Mock data
const mockYurts = [
  { id: 1, name: "Ak-Say Yurt Camp", location: "Son-Kol Lake", price: 2500, capacity: 4, type: "yurt", image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=400&h=300&fit=crop" },
  { id: 2, name: "Jyldyz Jailoo", location: "Issyk-Kol Region", price: 3000, capacity: 5, type: "yurt", image: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?w=400&h=300&fit=crop" },
  { id: 3, name: "Ala-Archa Yurt", location: "Chuy Valley", price: 2000, capacity: 3, type: "yurt", image: "https://images.pexels.com/photos/266498/pexels-photo-266498.jpeg?w=400&h=300&fit=crop" },
];

// Mock auth
let mockToken = null;

export const auth = {
  register: async (userData) => {
    mockToken = "mock-jwt-token";
    localStorage.setItem("token", mockToken);
    return { token: mockToken, user: { email: userData.email, full_name: userData.full_name } };
  },
  login: async (credentials) => {
    mockToken = "mock-jwt-token";
    localStorage.setItem("token", mockToken);
    return { token: mockToken, user: { email: credentials.email } };
  }
};

export const places = {
  getAll: async (params = {}) => {
    return mockYurts.filter(p => !params.type || p.type === params.type);
  },
  getById: async (id) => mockYurts.find(p => p.id === parseInt(id)),
};

// Mock bookings stored in localStorage
const getMockBookings = () => {
  const saved = localStorage.getItem("mockBookings");
  return saved ? JSON.parse(saved) : [];
};

const saveMockBookings = (bookings) => {
  localStorage.setItem("mockBookings", JSON.stringify(bookings));
};

export const bookings = {
  create: async (bookingData) => {
    const newBooking = { ...bookingData, id: Date.now(), created_at: new Date().toISOString() };
    const existing = getMockBookings();
    saveMockBookings([...existing, newBooking]);
    return newBooking;
  },
  getMyBookings: async () => {
    return getMockBookings();
  },
  cancel: async (id) => {
    const existing = getMockBookings();
    saveMockBookings(existing.filter(b => b.id !== parseInt(id)));
    return { success: true };
  }
};