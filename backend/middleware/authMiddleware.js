const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  
  try {
    // Получаем заголовок Authorization
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    console.log('🔐 Auth header:', authHeader);
    console.log('🔐 All headers:', req.headers);
    
    if (!authHeader) {
      console.error('❌ No authorization header found');
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    // Извлекаем токен (поддерживаем оба варианта написания)
    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (authHeader.startsWith('bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = authHeader;
    }
    
    console.log('🔐 Token extracted:', token ? `${token.substring(0, 20)}...` : 'null');
    
    if (!token) {
      console.error('❌ No token in authorization header');
      return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }
    
    // Проверяем наличие JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    console.log('🔐 Verifying token with secret:', process.env.JWT_SECRET.substring(0, 10) + '...');
    
    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('✅ Token verified successfully for user:', decoded.userId);
    
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error.name, error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token', details: error.message });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', details: error.message });
    }
    
    res.status(401).json({ error: 'Invalid or expired token', details: error.message });
  }
};

module.exports = authMiddleware;