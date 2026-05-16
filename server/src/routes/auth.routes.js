import express from 'express'
import {
    registerUser,
    loginUser,
    getCurrent
} from '../controllers/auth.controller.js'

import { authenticate } from '../middleware/auth.middleware.js'

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/verify',authenticate,getCurrent)

export default router