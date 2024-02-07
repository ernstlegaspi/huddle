import express from 'express'
import { addNotification, deleteNotification, getUserNotification } from '../controllers/notification'
import { checkMiddleware, checkValidEmail, checkValidEmailParams, checkValidUser } from '../middleware'

const router = express.Router()

router.get('/notification/user-notification/:email', checkMiddleware, checkValidEmailParams, checkValidUser, getUserNotification)

router.post('/notification/', checkMiddleware, checkValidEmail, checkValidUser, addNotification)

router.delete('/notification/:email/:id/:otherUserId', checkMiddleware, checkValidEmailParams, checkValidUser, deleteNotification)

export default router
