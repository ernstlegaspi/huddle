import express from 'express'
import { addNotification, getUserNotification } from '../controllers/notification'
import { checkMiddleware, checkValidEmail, checkValidEmailParams, checkValidUser } from '../middleware'

const router = express.Router()

router.get('/notification/user-notification/:email', checkMiddleware, checkValidEmailParams, checkValidUser, getUserNotification)

router.post('/notification/', checkMiddleware, checkValidEmail, checkValidUser, addNotification)

export default router
