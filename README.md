# Es Al

**Es Al** is a booking platform for yurts and traditional rest camps across Kyrgyzstan — built for international tourists.

Es Al is a web service that helps foreign tourists find and book authentic yurts and topchan camps in the regions of Kyrgyzstan. The platform includes an AI chatbot that answers questions in English about locations, amenities, and travel tips.

---

## The Problem

Foreign tourists have no platform to find and book yurts in the regions of Kyrgyzstan. Everything happens through WhatsApp and Instagram — no English interface, no prices, no guarantees. A tourist from Germany or Japan who wants to experience a real yurt stay simply cannot do it online. Our platform solves this.

---

## Target Audience

Es Al is built for international tourists — people who travel to Kyrgyzstan from abroad and want to experience something authentic, not a hotel room.

These are travelers who plan their trips online, book everything in advance, and rely on clear information before making a decision. They are curious about local culture, interested in nature and adventure, and willing to stay in a yurt — but only if they can find one they trust, understand the price, and confirm the booking without speaking Russian.

Many of them have heard about Issyk-Kul, the Tian Shan mountains, or traditional Kyrgyz nomadic life. They want to be part of it. What they are missing is a simple, reliable way to get there. That is exactly what Es Al provides.

---

## Core MVP Features

| Feature | Description |
|---|---|
| Authentication | Secure registration and login with JWT |
| Search | Browse yurts and topchans by region, capacity, and price |
| Booking | Select dates and number of guests, confirm instantly |
| AI Chatbot | Ask questions in English and get instant answers about any listing |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js (Express) |
| Database | PostgreSQL |
| AI Chatbot | Grok API |
| Authentication | JWT + bcrypt |
| Deployment | Vercel (frontend) · Railway (backend) |
| CI/CD | GitHub Actions |

---

## Links

| | |
|---|---|
| Live Site | [[insert link] |
| Trello Board | [(https://trello.com/b/a7foQ1X6/yurtbook)] |
| GitHub | [https://github.com/adoniiiii/Esal_Project] |

---

## Team

| Name | Role |
|---|---|
| Zhansaia Asanova | Project Manager |
| Gulaiym Nazarova | Backend Developer |
| Burulai Mamatusmanova | Frontend Developer |
| Zakhida Nasirdinova | AI Engineer |
| Aidai Kazakbaeva | DevSecOps |

---

---

## Project Structure

```
es-al/
├── frontend/        # React application
├── backend/         # Node.js REST API
├── database/        # SQL schema
├── docs/            # Project documentation
│   ├── Business_and_Technical_Analysis.md
│   ├── Agile_SDLC.md
│   └── Presentation_Prep.md
└── README.md
```

---

## Documentation

- [Agile and SDLC](./docs/Agile_SDLC.md)
- [Business Analysis](./docs/BUSINESS_ANALYSIS.md)
- [Technical Analysis](./docs/TECHNICAL_ANALYSIS.md)
