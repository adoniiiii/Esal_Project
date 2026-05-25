# Es Al

**Es Al** is a booking platform for traditional rest camps across Kyrgyzstan — built for international tourists.

Es Al is a web service that helps tourists find and book authentic yurts and topchan camps in the regions of Kyrgyzstan. The platform includes an AI chatbot that answers questions in multiple languages about locations, amenities, and travel tips.

---

## The Problem

Foreign tourists have no platform to find and book yurts in the regions of Kyrgyzstan. Everything happens through WhatsApp and Instagram — no English interface, no prices, no guarantees. A tourist from Germany or Japan who wants to experience a real yurt stay simply cannot do it online. Our platform solves this.

---

## Target Audience

Es Al is built for international tourists — people who travel to Kyrgyzstan from abroad and want to experience something authentic, not a hotel room. Also fits for Local tourists, Families, Eco-tourism travelers, Local service providers.

These are travelers who plan their trips online, book everything in advance, and rely on clear information before making a decision. They are curious about local culture, interested in nature and adventure, and willing to stay in a yurt — but only if they can find one they trust, understand the price, and confirm the booking without speaking Russian.

Many of them have heard about Issyk-Kul, the Tian Shan mountains, or traditional Kyrgyz nomadic life. They want to be part of it. What they are missing is a simple, reliable way to get there. That is exactly what Es Al provides.

---
## Running the Project with Docker

This project can be started locally using Docker Compose. Docker runs three services:

- PostgreSQL database
- Backend server
- Frontend application

### Install Docker

Download Docker Desktop:

- Windows: install Docker Desktop and enable WSL 2 if required.
- macOS: install Docker Desktop for Mac.
- Linux: install Docker Engine and Docker Compose.

After installation, open Docker Desktop and make sure it is running.

### Check Docker installation

Run the following commands in the terminal:

```bash
docker --version
docker compose version
```

If Docker is installed correctly, both commands should show version information.

You can also check that Docker is running with:

```bash
docker ps
```

If there is no error, Docker is ready to use.

### 1. Create `.env` file

Create a `.env` file in the root directory and add the required environment variables:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=esal

PORT=5000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=esal

JWT_SECRET=change_this_secret

VITE_API_URL=http://localhost:5000
FRONTEND_URLS=http://localhost:5173,http://localhost:5174,http://localhost:3000
```

### 2. Start the project

From the root directory, run:

```bash
docker compose up --build
```

This command builds and starts all containers.

### 3. Open the application

```text
http://localhost:5173
```

### 4. Stop the project

```bash
docker compose down
```

### 5. Recreate the database

If you need to recreate the database from the SQL initialization files, run:

```bash
docker compose down -v
docker compose up --build
```
The database is initialized using SQL files from the `database/` folder.

---

## Security Measures

The project includes several basic security controls for the backend and deployed frontend:

- **Rate limiting:** `express-rate-limit` is used to reduce brute-force attempts and DoS-style abuse against API endpoints.
- **Authentication protection:** login and register routes have stricter request limits to reduce repeated unauthorized attempts.
- **Security headers:** `helmet` is used on the backend to set secure HTTP headers.
- **Clickjacking protection:** framing is blocked using `X-Frame-Options: DENY` and Content Security Policy `frame-ancestors 'none'`.
- **Frontend security headers:** additional HTTP response headers are configured on Render Static Site, including `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- **SQL injection protection:** PostgreSQL queries use parameterized placeholders such as `$1`, `$2` instead of directly concatenating user input into SQL strings.
- **XSS protection:** React safely renders user content by default, while security headers and backend input validation reduce XSS risks.
- **Environment secrets:** database credentials, JWT secret, and AI API keys are stored in environment variables instead of being committed to GitHub.
  
  <img width="3364" height="1662" alt="image" src="https://github.com/user-attachments/assets/04e6cd77-16db-4c18-a456-7e159575165b" />

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
| Presentation | https://canva.link/ow3ufqah1akn7nk |
| Live Site | https://esal-website-for-booking.onrender.com/ |
| Trello Board | https://trello.com/b/a7foQ1X6/yurtbook |
| GitHub | https://github.com/adoniiiii/Esal_Project |

---

## Team

| Name | Role |
|---|---|
| Zhansaia Asanova | Project Manager |
| Gulaiym Nazarova | Backend Developer |
| Burulai Mamatusmanova | Frontend Developer |
| Zakhida Nasiridinova | AI Engineer |
| Aidai Kazakbaeva | DevSecOps Engineer |

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
