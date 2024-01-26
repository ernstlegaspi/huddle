import express from 'express'

import { getUser, signIn, signOut, signUp, updateBirthday, updateEmail, updateName, updatePassword, updateProfile, updateUsername } from '../controllers/user'
import { checkMiddleware } from '../middleware'

const router = express.Router()

router.get('/auth/getUser/:email', checkMiddleware, getUser)

router.post("/auth/sign-in", signIn)
router.post("/auth/sign-up", signUp)
router.post('/auth/sign-out', checkMiddleware, signOut)

router.put('/user/updateProfile', checkMiddleware, updateProfile)
router.put('/user/updateBirthday', checkMiddleware, updateBirthday)
router.put('/user/updateEmail', checkMiddleware, updateEmail)
router.put('/user/updateName', checkMiddleware, updateName)
router.put('/user/updatePassword', checkMiddleware, updatePassword)
router.put('/user/updateUsername', checkMiddleware, updateUsername)

export default router
