import express from 'express'

import {
	acceptFriendRequest,
	appendToRequestsSent,
	getUser,
	getUserFriends,
	getUserWithSameInterests,
	passwordConfirmation,
	removePicture,
	signIn,
	signOut,
	signUp,
	updateBirthday,
	updateEmail,
	updateInterests,
	updateName,
	updatePassword,
	updatePhoto,
	updateProfile,
	updateUsername
} from '../controllers/user'
import {
	checkMiddleware,
	checkValidName,
	checkValidEmail,
	checkValidUsername,
	checkValidEmailParams,
	checkValidUser
} from '../middleware'

const router = express.Router()

router.get('/auth/getUser/:email', checkMiddleware, getUser)

router.post("/auth/sign-in", signIn)
router.post("/auth/sign-up", signUp)
router.post('/auth/sign-out', checkMiddleware, signOut)

router.get('/user/getUserWithSameInterests/:interests/:email', checkMiddleware, checkValidEmailParams, getUserWithSameInterests)
router.get('/user/get-user-friends/:email', checkMiddleware, checkValidEmailParams, checkValidUser, getUserFriends)

router.put('/user/append-to-requests-sent', checkMiddleware, checkValidEmail, checkValidUser, appendToRequestsSent)

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

router.put('/user/accept-friend-request', checkMiddleware, checkValidEmail, checkValidUser, acceptFriendRequest)


export default router
