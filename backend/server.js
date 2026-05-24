require('dotenv').config(); // ДОЛЖНО БЫТЬ В САМОМ НАЧАЛЕ

console.log('Environment variables loaded:');
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('PORT:', process.env.PORT);

const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 JWT_SECRET is ${process.env.JWT_SECRET ? 'SET ✅' : 'NOT SET ❌'}`);
});