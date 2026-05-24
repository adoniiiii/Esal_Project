require('dotenv').config();
const axios = require('axios');
const pool = require('../database');

async function getYurtsFromDB() {
  const result = await pool.query(`
    SELECT p.id, p.name, p.type, p.price, p.capacity, p.description, p.photo_url,
           r.name as region_name
    FROM places p
    LEFT JOIN regions r ON p.region_id = r.id
    ORDER BY p.name
  `);
  return result.rows;
}

async function callGroqAPI(messages, yurts) {
  const yurtContext = yurts.map(y => ({
    id: y.id,
    name: y.name,
    type: y.type,
    region: y.region_name,
    price: y.price,
    capacity: y.capacity,
    description: y.description || ''
  }));

  const systemPrompt = `You are a travel assistant for "Es Al" (Эс Ал) — an eco-tourism yurt booking platform in Kyrgyzstan.

YURTS AVAILABLE IN OUR DATABASE RIGHT NOW:
${JSON.stringify(yurtContext, null, 2)}

YOUR INSTRUCTIONS:
1. When a user asks for a yurt recommendation, look through the database above and pick the best matching yurts by their needs (region, price, capacity, type).
2. Always include the matching yurt IDs in recommended_yurt_ids so the user sees the cards.
3. Answer questions about Kyrgyzstan travel, regions, seasons, packing, culture.
4. Respond in the SAME language the user writes in (Russian, Kyrgyz, or English).
5. Be warm, specific, and helpful. Reference actual yurt names and prices from the database.

CRITICAL — always return valid JSON only, no markdown, no code blocks, no extra text:
{
  "reply": "your response here",
  "recommended_yurt_ids": [1, 2, 3]
}

If no yurts to recommend, use empty array [].
If user asks about Son-Kul and we have yurts there, include their IDs.
Always reference real data from the database — never make up prices or names.
Always end your reply with a follow-up question to better understand the user's needs. For example: "Что вам важнее, быть ближе к городу или аренда лошадей?" or "Какой у вас бюджет на ночь?"`;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.5,
      max_tokens: 1000,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const rawText = response.data.choices[0].message.content;
  console.log('Groq raw response:', rawText);

  try {
    const clean = rawText.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return { reply: rawText, recommended_yurt_ids: [] };
  }
}

async function sendMessage(req, res) {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = [
      ...history,
      { role: 'user', content: message }
    ];

    const yurts = await getYurtsFromDB();
    console.log('Yurts from DB:', yurts.length, 'places found');

    const result = await callGroqAPI(messages, yurts);
    console.log('Parsed result:', result);

    const recommendedYurts = yurts.filter(y =>
      (result.recommended_yurt_ids || []).includes(y.id)
    );

    res.json({
      reply: result.reply || result.message || 'No response',
      recommended_yurts: recommendedYurts
    });

  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}

module.exports = { sendMessage };