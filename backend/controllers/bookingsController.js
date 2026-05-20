const pool = require('../database');

// POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const { place_id, date_from, date_to, guests_count, total_price } = req.body;
    const user_id = req.userId;
    
    if (!place_id || !date_from || !date_to || !guests_count) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if place exists
    const placeResult = await pool.query('SELECT * FROM places WHERE id = $1', [place_id]);
    if (placeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    // Check for overlapping bookings
    const conflictResult = await pool.query(
      `SELECT id FROM bookings 
       WHERE place_id = $1 
       AND date_from < $3 
       AND date_to > $2
       AND status != 'cancelled'`,
      [place_id, date_from, date_to]
    );
    
    if (conflictResult.rows.length > 0) {
      return res.status(400).json({ 
        error: 'These dates are already taken! Please choose different dates.' 
      });
    }
    
    // Create booking
    const result = await pool.query(
      `INSERT INTO bookings (user_id, place_id, date_from, date_to, guests_count, total_price, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'confirmed')
       RETURNING *`,
      [user_id, place_id, date_from, date_to, guests_count, total_price]
    );
    
    res.status(201).json({ booking: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/me/bookings
const getUserBookings = async (req, res, next) => {
  try {
    const user_id = req.userId;
    
    const result = await pool.query(
      `SELECT b.*, p.name as place_name, p.type, r.name as region_name
       FROM bookings b
       JOIN places p ON b.place_id = p.id
       JOIN regions r ON p.region_id = r.id
       WHERE b.user_id = $1
       ORDER BY b.date_from DESC`,
      [user_id]
    );
    
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/bookings/:id
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    
    const result = await pool.query(
      `UPDATE bookings 
       SET status = 'cancelled'
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found or not yours' });
    }
    
    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getUserBookings, cancelBooking };