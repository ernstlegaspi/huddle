import express from 'express'

import { getUser, passwordConfirmation, removePicture, signIn, signOut, signUp, updateBirthday, updateEmail, updateInterests, updateName, updatePassword, updatePhoto, updateProfile, updateUsername } from '../controllers/user'
import { checkMiddleware, checkValidName, checkValidEmail, checkValidUsername } from '../middleware'

const router = express.Router()

router.get('/auth/getUser/:email', checkMiddleware, getUser)

router.post("/auth/sign-in", signIn)
router.post("/auth/sign-up", signUp)
router.post('/auth/sign-out', checkMiddleware, signOut)

router.put('/user/passwordConfirmation', checkMiddleware, checkValidEmail, passwordConfirmation)

router.put('/user/removePicture', checkMiddleware, checkValidEmail, removePicture)

router.put('/user/updateBirthday', checkMiddleware, checkValidEmail, updateBirthday)
router.put('/user/updateEmail', checkMiddleware, checkValidEmail, updateEmail)
router.put('/user/updateInterests', checkMiddleware, checkValidEmail, updateInterests)
router.put('/user/updateName', checkMiddleware, checkValidEmail, checkValidName, updateName)
router.put('/user/updatePassword', checkMiddleware, checkValidEmail, updatePassword)
router.put('/user/updateProfile', checkMiddleware, checkValidEmail, checkValidName, checkValidUsername, updateProfile)
router.put('/user/updatePhoto', checkMiddleware, updatePhoto)
router.put('/user/updateUsername', checkMiddleware, checkValidEmail, checkValidUsername, updateUsername)

export default router
