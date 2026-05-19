const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// TODO: After adding database, implement:
// - Yurt booking with date validation
// - Package tours (yurt + meals + horse)
// - Guide database

app.get('/', (req, res) => {
  res.json({ message: 'Jailoo Tourism API - Database will be added tomorrow' });
});

module.exports = app;