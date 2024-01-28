import express from 'express'
import { emailOtp } from '../controllers/otp'

const router = express.Router()

router.post('/otp/', emailOtp)

export default router
