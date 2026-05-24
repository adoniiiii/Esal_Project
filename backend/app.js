const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const regionsRoutes = require('./routes/regionsRoutes');
const placesRoutes = require('./routes/placesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Улучшенная CORS конфигурация
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Authorization']
}));

// Добавьте middleware для логирования всех запросов (для отладки)
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  console.log('📋 Headers:', JSON.stringify(req.headers, null, 2));
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;