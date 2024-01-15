import express from 'express'

import { signIn, signOut, signUp } from '../controllers/user'

const router = express.Router()

router.post("/auth/sign-in", signIn)
router.post("/auth/sign-up", signUp)
router.post('/auth/sign-out', signOut)

export default router
