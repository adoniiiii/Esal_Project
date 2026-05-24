const pool = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    console.log('=== REGISTER REQUEST ===');
    console.log('Request body:', req.body);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const { email, password, full_name, phone } = req.body;
    
    if (!email || !password || !full_name) {
      console.log('Missing fields:', { email: !!email, password: !!password, full_name: !!full_name });
      return res.status(400).json({ error: 'Email, password and full name are required' });
    }
    
    // Checkтing if user exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }
    
    console.log('Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    
    // Create user
    console.log('Creating user with:', { email, full_name, phone });
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, phone) 
       VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, phone, created_at`,
      [email, hashedPassword, full_name, phone]
    );
    
    const user = result.rows[0];
    console.log('User created:', user.id);
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    console.log('Token generated, sending response');
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('=== REGISTER ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, full_name, phone FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const user = result.rows[0];
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    next(error);
  }
};

module.exports = { register, login };