# TrackStack

TrackStack is a modern full-stack uptime monitoring platform built to monitor websites, APIs, and services in real time.

It provides uptime tracking, response time analytics, incident management, monitoring dashboards, dark mode, responsive SaaS-style UI, and operational insights.

---

# Features

## Authentication
- JWT-based authentication
- Protected dashboard routes
- Persistent login sessions
- Secure logout handling

---

## Monitor Management
Users can:

- Create uptime monitors
- Configure:
  - Request method (`GET`, `POST`, `HEAD`)
  - Check interval
  - Request timeout
- Edit monitor configurations
- Pause / Resume monitoring
- Delete monitors
- Trigger manual checks

---

## Real-Time Monitoring
TrackStack continuously checks monitor health and tracks:

- Current status
- Response times
- Consecutive successes
- Consecutive failures
- Last checked time
- Next scheduled check

---

## Incident Tracking
The system automatically:

- Detects downtime
- Creates incidents
- Tracks outage duration
- Resolves incidents automatically when services recover

---

## Dashboard Analytics
Each monitor includes:

- Uptime percentage
- Average response time
- Total checks
- Success / failure counts
- Response time history
- Status history
- Uptime distribution charts
- Recent checks table
- Incident history table

---

## UI / UX Features
- Fully responsive dashboard
- Mobile sidebar navigation
- Dark / Light mode
- Smooth theme transitions
- Reusable design system
- Skeleton loading states
- Empty states
- Overflow-safe tables
- Operational SaaS-style UI
- Responsive charts and analytics

---

# Tech Stack

## Frontend
- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Recharts
- Lucide React
- date-fns

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis

---

## Monitoring Infrastructure
- Background monitoring jobs
- Async monitor checks
- Incident generation system
- Scheduled polling architecture

---
