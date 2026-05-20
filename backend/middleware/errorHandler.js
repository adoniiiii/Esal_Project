// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Не показываем stack trace в продакшене
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(isProduction ? {} : { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;