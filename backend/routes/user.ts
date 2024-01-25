import express from 'express'

import { getUser, signIn, signOut, signUp, updateProfile } from '../controllers/user'
import { checkMiddleware } from '../middleware'

const router = express.Router()

router.get('/auth/getUser/:email', checkMiddleware, getUser)

router.post("/auth/sign-in", signIn)
router.post("/auth/sign-up", signUp)
router.post('/auth/sign-out', checkMiddleware, signOut)

router.put('/user/updateProfile', checkMiddleware, updateProfile)

export default router
