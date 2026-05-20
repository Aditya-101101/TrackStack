# TrackStack Backend

TrackStack is a MERN SaaS uptime monitoring application. This repository currently contains the backend MVP, split into two Node.js apps:

- `server/` — main Express API server
- `worker/` — background worker/scheduler app using Redis + BullMQ

The backend supports user authentication, monitor management, scheduled uptime checks, result storage, incident tracking, analytics APIs, and email alerts using Resend.

---

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes using `authenticate`

### Monitor Management

- Create monitors
- List user monitors
- Get monitor details
- Update monitors
- Delete monitors
- Pause/resume monitors using `isActive`
- Manual check endpoint

### Background Checks

- Redis + BullMQ queue
- Scheduler queues due monitor checks
- Worker consumes `check-queue` jobs
- HTTP checks are performed in the worker
- Results are persisted in MongoDB
- Monitor fields are updated after every check:
  - `status`
  - `lastCheckedAt`
  - `lastResponseTime`
  - `nextCheckAt`
  - `consecutiveSuccesses`
  - `consecutiveFailures`

### Incident Management

Incident logic is implemented in the worker.

- When a monitor changes to `DOWN`, an `OPEN` incident is created.
- Duplicate open incidents are prevented.
- When a monitor recovers from `DOWN` to `UP`, the open incident is marked as `RESOLVED`.
- Incident APIs are available for global and monitor-specific views.

### Email Alerts

Email alerts are implemented using Resend.

- DOWN email is sent when a new incident opens.
- RECOVERY email is sent when an incident resolves.
- Emails are sent from the worker app.
- Resend API key and email sender are stored in `worker/.env`.

### Analytics

- Dashboard summary API
- Monitor stats API
- Result history APIs
- Incident APIs

### Performance

MongoDB indexes were added for common dashboard, stats, incident, and scheduler queries.

### Queue Cleanup

BullMQ job cleanup is configured/recommended with:

```js
{
  removeOnComplete: true,
  removeOnFail: 100
}
```

This removes completed jobs automatically and keeps the latest 100 failed jobs for debugging.

---

## Project Structure

```txt
trackstack/
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   ├── .env
│   └── package.json
│
└── worker/
    ├── src/
    │   ├── config/
    │   ├── models/
    │   ├── queues/
    │   ├── schedulers/
    │   ├── services/
    │   ├── utility/
    │   ├── workers/
    │   │   └── check.worker.js
    │   └── index.js
    ├── .env
    └── package.json
```

---

## Important Backend Files

### Server App

```txt
server/src/app.js
server/src/controllers/auth.controller.js
server/src/controllers/monitor.controller.js
server/src/controllers/check.controller.js
server/src/controllers/result.controller.js
server/src/controllers/incident.controller.js
server/src/controllers/dashboard.controller.js
server/src/controllers/stats.controller.js
server/src/routes/auth.routes.js
server/src/routes/monitor.routes.js
server/src/routes/check.routes.js
server/src/routes/result.routes.js
server/src/routes/incident.routes.js
server/src/routes/dashboard.routes.js
server/src/routes/stats.routes.js
server/src/models/user.model.js
server/src/models/monitor.model.js
server/src/models/result.model.js
server/src/models/incident.model.js
```

### Worker App

```txt
worker/src/workers/check.worker.js
worker/src/services/check.service.js
worker/src/utility/sendEmail.js
worker/src/models/user.model.js
worker/src/models/monitor.model.js
worker/src/models/result.model.js
worker/src/models/incident.model.js
worker/src/schedulers/
```

---

## API Routes

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
```

### Monitors

```txt
POST /api/monitors
GET /api/monitors
GET /api/monitors/:id
PATCH /api/monitors/:id
DELETE /api/monitors/:id
```

Pause/resume endpoints may also exist if implemented separately.

### Manual Check

```txt
POST /api/monitors/:id/check
```

### Results

```txt
GET /api/monitors/:id/results
GET /api/monitors/:id/results/latest
```

### Incidents

```txt
GET /api/incidents
GET /api/incidents/open
GET /api/monitors/:id/incidents
```

### Analytics

```txt
GET /api/dashboard/summary
GET /api/monitors/:id/stats
```

---

## Route Order

Specific monitor sub-routes should be mounted before generic monitor routes.

Recommended order in `server/src/app.js`:

```js
app.use("/api/auth", authRoutes);
app.use("/api", incidentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/monitors", statsRoutes);
app.use("/api/monitors", checkRoutes);
app.use("/api/monitors", resultRoutes);
app.use("/api/monitors", monitorRoutes);

app.use(errorMiddleware);
```

This prevents generic routes like:

```txt
GET /api/monitors/:id
```

from conflicting with routes like:

```txt
GET /api/monitors/:id/stats
GET /api/monitors/:id/results
POST /api/monitors/:id/check
```

---

## MongoDB Indexes

### Result Model

```js
resultSchema.index({ monitorId: 1, checkedAt: -1 });
resultSchema.index({ userId: 1, checkedAt: -1 });
resultSchema.index({ userId: 1, status: 1 });
```

### Incident Model

```js
incidentSchema.index({ monitorId: 1, startedAt: -1 });
incidentSchema.index({ userId: 1, startedAt: -1 });
incidentSchema.index({ userId: 1, status: 1 });
```

### Monitor Model

```js
monitorSchema.index({ userId: 1, createdAt: -1 });
monitorSchema.index({ userId: 1, status: 1 });
monitorSchema.index({ isActive: 1, nextCheckAt: 1 });
```

---

## Worker Incident and Email Logic

The worker fetches monitors with the owner email populated:

```js
const monitor = await Monitor.findOne({
  _id: monitorId,
  userId,
}).populate("userId", "email");
```

After populate:

```js
const ownerId = monitor.userId._id || monitor.userId;
const ownerEmail = monitor.userId.email;
```

Use `ownerId` for database writes:

```js
userId: ownerId
```

Use `ownerEmail` for email alerts.

### DOWN Alert Logic

A DOWN email is sent only when:

```js
result.status === "DOWN" && previousStatus !== "DOWN"
```

and no existing `OPEN` incident exists.

### Recovery Alert Logic

A recovery email is sent only when:

```js
result.status === "UP" && previousStatus === "DOWN"
```

and an existing `OPEN` incident is found.

This prevents repeated DOWN emails while a monitor remains down.

---

## Mongoose Notes

Mongoose deprecated:

```js
{ new: true }
```

Use this instead:

```js
{ returnDocument: "after" }
```

Example:

```js
const monitor = await Monitor.findOneAndUpdate(
  {
    _id: req.params.id,
    userId: req.user._id,
  },
  updates,
  {
    returnDocument: "after",
    runValidators: true,
  }
);
```

---

## Email Setup

Gmail App Password was not available, so Resend is used.

### Worker `.env`

```env
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=Uptime Monitor <onboarding@resend.dev>
```

For production, verify a custom domain in Resend and use something like:

```env
EMAIL_FROM=TrackStack Alerts <alerts@yourdomain.com>
```

The temporary `/api/test-email` route should be removed from `server/src/app.js` after testing.

---

## BullMQ Notes

BullMQ job IDs are historical/incrementing IDs.

For example:

```txt
Check job completed: 609
```

does not mean 609 jobs are currently queued. It means the job ID is `609`.

To check actual queue counts, use:

```js
await checkQueue.getJobCounts(
  "waiting",
  "active",
  "delayed",
  "completed",
  "failed"
);
```

Recommended queue job options:

```js
await checkQueue.add(
  "scheduled-check",
  {
    monitorId: monitor._id,
    userId: monitor.userId,
  },
  {
    removeOnComplete: true,
    removeOnFail: 100,
  }
);
```

---

## Known Issue / Post-MVP Improvement

Some sites, such as Codeforces, may be marked `DOWN` even when active because backend HTTP checks can be blocked, timeout, redirect, or return status codes like `403` or `429`.

Later improve `worker/src/services/check.service.js` with:

- Browser-like headers
- Better timeout handling
- Redirect handling
- Expected status code configuration
- Better error logging
- Optional user-configurable accepted status codes

---

## Environment Variables

### Server `.env`

Typical values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any Redis variables here if the server also interacts with BullMQ/Redis.

### Worker `.env`

Typical values:

```env
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=localhost
REDIS_PORT=6379
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=Uptime Monitor <onboarding@resend.dev>
```

Adjust based on your actual Redis config.

---

## Running the Apps

### Start Server

```bash
cd server
npm install
npm run dev
```

### Start Worker

```bash
cd worker
npm install
npm run dev
```

If scheduler and worker have separate commands, run both according to the scripts in `worker/package.json`.

---

## Final Backend Status

The backend MVP currently includes:

- Auth
- JWT protected routes
- Monitor CRUD
- Pause/resume
- Manual checks
- Redis/BullMQ queue
- Scheduler
- Worker process
- HTTP checks
- Result persistence
- Monitor status updates
- Incident open/resolve logic
- Incident APIs
- Dashboard summary API
- Monitor stats API
- MongoDB indexes
- Resend email alerts
- Queue cleanup config

This is enough to start frontend development.

---

## Frontend Plan

Use pure MERN frontend with:

- React + Vite
- React Router
- Axios
- Tailwind CSS
- Recharts
- GSAP animations
- Lucide React icons
- Light/dark mode
- Protected routes

Frontend MVP pages:

- Login
- Register
- Dashboard
- Monitor list
- Create monitor
- Edit monitor
- Monitor detail
- Results/history
- Incidents
- Basic settings/profile

SEO and public status pages are postponed until after MVP.
