require('dotenv').config();
const axios = require('axios');

async function callGrokAPI(userMessage) {
    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
        model: 'grok-beta',
        messages: [
            {
                role: 'system',
                content: ''
            },
            {
                role: 'user',
                content: userMessage
            }
        ]
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.data.choices[0].message.content;
}

async function sendMessage(req, res) {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Сообщение обязательно' });
        }
        
        const reply = await callGrokAPI(message);
        res.json({ response: reply });
        
    } catch (error) {
        console.error('Ошибка Grok API:', error.response?.data || error.message);
        res.status(500).json({ error: 'Ошибка при обращении к AI' });
    }
}

module.exports = { sendMessage };