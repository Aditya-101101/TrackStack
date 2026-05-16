import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import errorMiddleware from "./middleware/error.middleware.js";
import testRoutes from './routes/test.routes.js'
import authRoutes from './routes/auth.routes.js'
import monitorRoutes from './routes/monitor.routes.js'

const app=express()

app.use(helmet())

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:"TrackStack API running"})
})

app.get('/health',(req,res)=>{
    res.json({
        status:"ok",
        service:"TrackStack API",
    })
})

app.use('/api',testRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/monitors',monitorRoutes)
app.use(errorMiddleware)

export default app;