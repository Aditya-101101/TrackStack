import express from 'express'
import { runManualCheck } from '../controllers/check.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router= express.Router()

router.use(authenticate)

router.post("/:id/check",runManualCheck)

export default router