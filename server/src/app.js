import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from './routes/auth.routes.js'
import monitorRoutes from './routes/monitor.routes.js'
import checkRoutes from './routes/check.route.js'
import resultRoutes from './routes/result.routes.js'
import incidentRoutes from "./routes/incident.route.js";
import dashboardRoutes from './routes/dashboard.routes.js'
import statsRoute from './routes/stats.route.js'


const app = express()

app.use(helmet())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({ message: "TrackStack API running" })
})

app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        service: "TrackStack API",
    })
})

app.use('/api/auth', authRoutes)
app.use('/api', incidentRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/monitors', statsRoute)
app.use('/api/monitors', checkRoutes)
app.use('/api/monitors', resultRoutes)
app.use('/api/monitors', monitorRoutes)

app.use(errorMiddleware)

export default app;