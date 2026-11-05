# API Inspector

A full-stack API testing tool. Send HTTP requests, group them into test cases, add assertions on the responses, and view pass/fail reports, similar to a lightweight Postman.

## Features

- Create and send API requests (method, URL, headers, body) and save them
- Organize requests into **test cases** and attach **assertions** to check responses
- **Reports** showing which test cases passed or failed
- User accounts with email OTP verification, password reset, JWT/session auth and reCAPTCHA
- Asynchronous request processing through a **RabbitMQ** queue and consumer

## Architecture

```
React (Vite)  --->  Express API  --->  PostgreSQL
 :5173               :3000              (Sequelize)
                       |
                       v
                   RabbitMQ  --->  consumer.js  --->  target APIs
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express, Sequelize |
| Database | PostgreSQL |
| Queue | RabbitMQ |
| Testing | Jest, Supertest, Selenium |
| DevOps | Docker, Docker Compose, GitLab CI |
| Cloud | AWS EC2, AWS RDS |

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for Postgres and RabbitMQ)

### 1. Start the database and queue

```bash
docker compose up -d postgres rabbitmq
```

### 2. Backend

Copy `backend/.env.example` to `backend/.env` and fill in the values (never commit this file).

```bash
cd backend
npm install
npm run db:migrate
npm start            # API on http://localhost:3000
node consumer.js     # in a second terminal
```

### 3. Frontend

Copy `frontend/.env.example` to `frontend/.env` and fill in the values.

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## Environment Variables

**Backend:** `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, `SESSION_SECRET`, `FRONTEND_URL`, `RECAPTCHA_SECRET_KEY`, `EMAIL_USER`, `EMAIL_PASS`

**Frontend:** `VITE_API_URL`, `VITE_BACKEND_URL`, `VITE_SITE_KEY`

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register`, `/login`, `/verify-otp` | Authentication |
| POST | `/forgot-password`, `/reset-password/:token` | Password reset |
| POST | `/request`, `/requestSave` | Send and save API requests |
| GET/POST/PUT/DELETE | `/test-cases` | Manage test cases |
| POST/PUT/DELETE | `/test-cases/:id/assertions`, `/assertions/:id` | Manage assertions |
| GET | `/report` | Test results report |

## Testing

```bash
cd backend && npm test
```

The GitLab CI pipeline runs backend tests against a Postgres service and frontend end-to-end tests with Selenium.

## Deployment

The app is containerized with Docker and was deployed on **AWS EC2** with **AWS RDS (PostgreSQL)** in us-east-1. Screenshots and recordings are in the `proofs/` folder.

## Author

Neha Amina Riyaz