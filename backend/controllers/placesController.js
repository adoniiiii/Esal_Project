const pool = require('../database');

// GET /api/places?regionId=1&type=yurt
const getAllPlaces = async (req, res, next) => {
  try {
    const { regionId, type } = req.query;
    let query = `
      SELECT p.*, r.name as region_name 
      FROM places p 
      JOIN regions r ON p.region_id = r.id 
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;
    
    if (regionId) {
      query += ` AND p.region_id = $${paramIndex}`;
      params.push(regionId);
      paramIndex++;
    }
    
    if (type) {
      query += ` AND p.type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }
    
    query += ' ORDER BY p.name';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET /api/places/:id
const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, r.name as region_name 
       FROM places p 
       JOIN regions r ON p.region_id = r.id 
       WHERE p.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// GET /api/places/:id/availability?from=2025-06-01&to=2025-06-05
const checkAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ error: 'From and to dates are required' });
    }
    
    // Get conflicting bookings
    const result = await pool.query(
      `SELECT id, date_from, date_to 
       FROM bookings 
       WHERE place_id = $1 
       AND date_from < $3 
       AND date_to > $2
       AND status != 'cancelled'`,
      [id, from, to]
    );
    
    const booked_dates = result.rows;
    const available = booked_dates.length === 0;
    
    res.json({
      available,
      booked_dates: booked_dates.map(b => ({
        from: b.date_from,
        to: b.date_to
      }))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPlaces, getPlaceById, checkAvailability };