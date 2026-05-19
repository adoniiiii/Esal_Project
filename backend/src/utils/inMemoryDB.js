/**
 * In-memory database simulation (to be replaced with real database later)
 * This stores all yurts and bookings temporarily
 */

// Available yurts in different regions of Kyrgyzstan
const yurts = [
    { id: 1, name: 'Son-Kul Yurt Camp', region: 'Son-Kul', capacity: 5, pricePerNight: 45, owner: 'Bekzat' },
    { id: 2, name: 'Issyk-Kul North Shore', region: 'Issyk-Kul', capacity: 4, pricePerNight: 50, owner: 'Aibek' },
    { id: 3, name: 'Jailoo Nomad Stay', region: 'Naryn', capacity: 6, pricePerNight: 40, owner: 'Kanybek' },
    { id: 4, name: 'Ala-Archa Mountain Yurt', region: 'Chuy', capacity: 3, pricePerNight: 55, owner: 'Mirlan' }
  ];
  
  // Existing bookings (demonstrates date conflict validation)
  const bookings = [
    {
      id: 1,
      yurtId: 1,
      startDate: '2025-06-05',
      endDate: '2025-06-10',
      touristName: 'John Doe',
      touristEmail: 'john@example.com',
      createdAt: '2025-05-01T10:00:00Z'
    },
    {
      id: 2,
      yurtId: 2,
      startDate: '2025-07-15',
      endDate: '2025-07-20',
      touristName: 'Emma Wilson',
      touristEmail: 'emma@example.com',
      createdAt: '2025-05-02T14:30:00Z'
    }
  ];
  
  // Package tours (Combo services)
  const packages = [
    { id: 1, name: 'Complete Nomad Experience', includes: ['Yurt stay', '3 meals', 'Horse riding', 'Eagle show'], price: 120 },
    { id: 2, name: 'Horse Trekking Package', includes: ['Yurt stay', 'Breakfast', 'Full day horse riding'], price: 85 }
  ];
  
  module.exports = { yurts, bookings, packages };