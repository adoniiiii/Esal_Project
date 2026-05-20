// test-db.js
require('dotenv').config();
const pool = require('./database');

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('📝 Connection settings:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      // password: 'hidden' // пароль скрыт для безопасности
    });
    
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected:', result.rows[0]);
    
    // Проверим таблицы
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('📊 Tables in database:', tables.rows.map(t => t.table_name));
    
    // Проверим пользователей
    const users = await pool.query('SELECT COUNT(*) FROM users');
    console.log('👥 Number of users:', users.rows[0].count);
    
    console.log('✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('💡 Troubleshooting tips:');
    console.error('   1. Is PostgreSQL running?');
    console.error('   2. Check .env file settings');
    console.error('   3. Verify password is correct');
    process.exit(1);
  }
}

testConnection();