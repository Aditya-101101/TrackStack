import express from 'express'

import { getLatestMonitorResult,getMonitorResult } from '../controllers/result.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router=express.Router()

router.use(authenticate)

router.get("/:id/results",getMonitorResult)
router.get('/:id/results/latest',getLatestMonitorResult)

export default router