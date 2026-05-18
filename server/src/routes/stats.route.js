import express from 'express'
import { getMonitorStats } from '../controllers/stats.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router= express.Router()

router.use(authenticate)

router.get("/:id/stats",getMonitorStats)

export default router
