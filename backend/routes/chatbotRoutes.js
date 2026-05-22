const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chatbotController'); // Путь к контроллеру
const authMiddleware = require('../middleware/authMiddleware'); // 1. Импортируем вашу авторизацию

// 2. Передаем authMiddleware вторым аргументом перед sendMessage
router.post('/message', authMiddleware, sendMessage);

module.exports = router;