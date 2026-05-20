const pool = require('../config/database');

// GET /api/regions
const getAllRegions = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, name FROM regions ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllRegions };