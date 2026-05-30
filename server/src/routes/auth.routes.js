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
router.post('/logout', (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    }).json({
            message: "Logged out",
        });
})

export default router