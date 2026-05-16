import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
import { createMonitor,deleteMonitor,getMonitor, getMonitorById, updateMonitor,pauseMonitor,resumeMonitor } from '../controllers/monitor.controller.js'


const router = express.Router()

router.use(authenticate)

router.post('/',createMonitor)
router.get('/',getMonitor)
router.get('/:id',getMonitorById)
router.patch('/:id',updateMonitor)
router.delete('/:id',deleteMonitor)
router.post("/:id/pause", pauseMonitor)
router.post("/:id/resume", resumeMonitor)

export default router