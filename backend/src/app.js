const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const regionsRoutes = require('./routes/regionsRoutes');
const placesRoutes = require('./routes/placesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
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

// Error handler
app.use(errorHandler);

module.exports = app;