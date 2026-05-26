# TrackStack

TrackStack is a modern full-stack uptime monitoring platform built for monitoring websites and APIs in real time.

It provides:
- uptime tracking
- response time analytics
- incident management
- real-time monitoring
- operational dashboards
- dark mode
- responsive SaaS-style UI
- automated background monitoring

---

# Live Demo

## Frontend
https://track-stack-phi.vercel.app

## Backend API
https://trackstack-gzxe.onrender.com

---

# Features

## Authentication System
- JWT-based authentication
- Persistent login sessions
- Protected routes
- Secure logout flow

---

## Monitor Management
Users can:
- Create monitors
- Edit monitors
- Delete monitors
- Pause / Resume monitoring
- Trigger manual checks

Supported monitor configuration:
- HTTP methods (`GET`, `POST`, `HEAD`)
- Custom intervals
- Request timeouts

---

## Real-Time Monitoring
TrackStack continuously monitors:
- website uptime
- API availability
- response time performance

The monitoring worker:
- runs background checks
- updates monitor health
- stores check history
- detects outages automatically

---

## Incident Management
The system automatically:
- creates incidents on failures
- resolves incidents on recovery
- tracks outage duration
- stores incident history

---

## Dashboard Analytics
TrackStack provides:
- uptime percentage
- response time charts
- uptime distribution charts
- status history charts
- total checks
- successful / failed checks
- recent checks table
- incident history table

---

## UI / UX Features
- Fully responsive design
- Mobile sidebar navigation
- Dark / Light mode
- Smooth theme transitions
- Skeleton loading states
- Empty states
- Overflow-safe tables
- Reusable design system
- Operational dashboard UI

---

# Tech Stack

## Frontend

### React
Used for building the component-based UI architecture.

### Redux Toolkit
Used for:
- global state management
- async API handling
- auth state
- monitor state
- incidents & analytics state

### React Router DOM
Used for:
- client-side routing
- protected routes
- nested layouts

### Tailwind CSS
Used for:
- utility-first styling
- responsive layouts
- dark mode
- reusable UI system

### Recharts
Used for:
- uptime analytics
- response time charts
- monitoring visualizations

### Lucide React
Used for:
- consistent modern icons
- dashboard UI icons

### date-fns
Used for:
- formatting timestamps
- relative time display

---

# Backend

## Node.js
Runtime environment for backend services.

### Express.js
Used for:
- REST APIs
- middleware handling
- authentication routes
- monitoring endpoints

### MongoDB Atlas
Cloud database used for storing:
- users
- monitors
- incidents
- monitor results
- analytics data

### Mongoose
Used for:
- MongoDB schema modeling
- database queries
- validation

### Redis Cloud
Used for:
- async monitoring queues
- background job processing
- operational caching

---

# Infrastructure

## Vercel
Hosts the frontend React application.

## Render
Hosts:
- backend API
- monitoring worker service

---

# Architecture

Frontend (Vercel)
->
Backend API (Render)
->
MongoDB Atlas

Worker Service (Render)
->
Redis Cloud
->
Background Monitor Checks

---

# Monitoring Workflow

User Creates Monitor
->
Worker Scheduler Starts Checks
->
HTTP Request Sent
->
Result Stored In MongoDB
->
Monitor Status Updated
->
Incident Created If Failed
->
Incident Resolved On Recovery

---

# Frontend Routes

## Public Routes

| Route | Description |
|---|---|
| `/login` | User login |
| `/register` | User registration |

---

## Protected Routes

| Route | Description |
|---|---|
| `/dashboard` | Main monitoring dashboard |
| `/monitors` | All monitors |
| `/monitors/create` | Create monitor |
| `/monitors/:id` | Monitor details |
| `/monitors/:id/edit` | Edit monitor |
| `/incidents` | Incidents history |
| `/settings` | User settings |

---

# Backend API Routes

## Authentication

### POST `/api/auth/register`
Create new account.

### POST `/api/auth/login`
Authenticate user and return JWT token.

### GET `/api/auth/me`
Get current authenticated user.

---

## Monitor Routes

### GET `/api/monitors`
Get all monitors.

### POST `/api/monitors`
Create monitor.

### GET `/api/monitors/:id`
Get monitor details.

### PATCH `/api/monitors/:id`
Update monitor.

### DELETE `/api/monitors/:id`
Delete monitor.

### POST `/api/monitors/:id/check`
Trigger manual monitor check.

### PATCH `/api/monitors/:id/toggle`
Pause / Resume monitor.

---

## Results Routes

### GET `/api/results/:monitorId`
Get monitor check history.

---

## Stats Routes

### GET `/api/stats/:monitorId`
Get monitor statistics and analytics.

---

## Incident Routes

### GET `/api/incidents`
Get all incidents.

### GET `/api/incidents/:monitorId`
Get monitor-specific incidents.

---

# Database Models

## User
Stores:
- name
- email
- password hash

---

## Monitor
Stores:
- monitor name
- URL
- HTTP method
- interval
- timeout
- status
- response time
- active state

---

## Monitor Result
Stores:
- monitor status
- response time
- status code
- check timestamp
- error messages

---

## Incident
Stores:
- outage status
- start time
- resolution time
- related monitor

---

# Responsive Design

TrackStack is optimized for:
- mobile devices
- tablets
- desktop dashboards

Responsive features include:
- mobile sidebar drawer
- adaptive grids
- overflow-safe tables
- responsive charts
- wrapped controls

---

# Dark Mode

TrackStack includes:
- full dark theme
- persistent theme storage
- smooth transitions
- dark-aware charts/components

---

# Project Structure

```bash
trackstack/
├── client/
│   ├── src/
│   └── public/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── services/
│   │   └── config/
│
├── worker/
│   ├── src/
│   │   ├── workers/
│   │   ├── schedulers/
│   │   └── config/
│
└── README.md