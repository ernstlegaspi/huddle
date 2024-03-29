import bcrypt from 'bcrypt'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { Request, Response } from 'express'

import User from '../models/user'
import {
	catchError,
	error,
	getUserId,
	isValidBirthday,
	isValidEmail,
	isValidName,
	success
} from '../utils/index'
import { signInSchema, signUpSchema } from '../utils/schema'
import { errorEmail, errorName, errorUnauthorized } from '../utils/constants'
import { userPushField, userSetField } from '../utils/db/user'
import { postSetField } from '../utils/db/post'

const COOKIE_AGE = 9999999999999

export const signIn = (req: Request, res: Response) => {
	return catchError(async () => {
		const { error: joiError, value } = signInSchema.validate(req.body)
		const { email, password } = value

		if(joiError) return error(400, res, "Error signing in. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		const user = await User.findOne({ email })

		if(!user) return error(404, res, "User does not exist.")

		const comparePassword = await bcrypt.compare(password, user.password as string)

		if(!comparePassword) return error(401, res, "User does not exist.")

		delete (user as any)?.password

		const token = jwt.sign({
			id: user._id,
			email: user.email
		}, process.env.KEY as string, { expiresIn: '3h' })

		const picture = user?.picture ? user?.picture : ''
		
		return res.cookie('token', token, {
			maxAge: COOKIE_AGE,
			sameSite: 'lax',
			httpOnly: true,
			secure: false,
			domain: req.hostname,
			path: '/'
		})
		.json({
			email: user?.email,
			name: user?.name,
			username: user?.username,
			picture
		})
	}, res)
}

export const signUp = (req: Request, res: Response) => {
	return catchError(async () => {
		const { error: joiError, value } = signUpSchema.validate(req.body)
		const { email, name, password, interests: interestsData, username } = value
		const interests: string[] = interestsData as string[]

		if(interests.length < 1 || joiError) return error(400, res, 'Error signing up. Try again later.')

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		if(!isValidName(name)) return error(400, res, errorName)

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const existingUser = await User.findOne({ email })

		if(existingUser) return error(409, res, "Email is already existing")

		const existingUsername = await User.findOne({ username })

		const newUser = await new User({
			...req.body,
			interests: ['testing'],
			password: hashedPassword,
			username: existingUsername ? `${username}${Date.now()}` : username
		}).save()

		const token = jwt.sign({
			id: newUser._id,
			email: newUser.email
		}, process.env.KEY as string, { expiresIn: '3h' })

		const picture = newUser?.picture ? newUser?.picture : ''

		return res.cookie('token', token, {
			maxAge: COOKIE_AGE,
			sameSite: 'lax',
			httpOnly: true,
			secure: false,
			domain: req.hostname,
			path: '/'
		})
		.json({
			email: newUser?.email,
			name: newUser?.name,
			picture,
			username: newUser?.username
		})
	}, res)
}

export const signOut = (req: Request, res: Response) => {
	return res.status(200).clearCookie('token').json({})
}

export const getUser = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email } = req.params

		if(!email) return error(401, res, "Unauthorized. Sign in first.")

		if(!isValidEmail(email)) return error(400, res, "Enter a valid email.")
		
		const user = await User.findOne({ email }).select('-password')

		if(!user) return error(404, res, "User does not exist. Log in first.")

		return success(user, 200, res)
	}, res)
}

export const updateBirthday = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { birthday, email } = req.body
		const userId = getUserId(req)

		if(!birthday) return error(400, res, "Error updating birthday. Try again later.")

		if(!isValidBirthday(birthday)) return error(400, res, "Enter a valid birthday.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist.")

		if(user.birthday === birthday) return error(400, res, "There are no changes in your birthday.")
		
		await userSetField(userId, { birthday })

		return success({}, 201, res)
	}, res)
}

export const updateEmail = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, newEmail } = req.body
		const userId = getUserId(req)

		const user = await User.findOne({ email })

		if(!user) return error(401, res, errorUnauthorized)

		if(user.email === newEmail) return error(400, res, "There are no changes in email.")

		await userSetField(userId, { email: newEmail })

		return success({
			email: newEmail
		}, 201, res)
	}, res)
}

export const updateInterests = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, interests } = req.body
		const interestArray: string[] = interests
		const userId = getUserId(req)

		if(interestArray.length < 1) return error(400, res, "Error updating interests. Try again later.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist.")

		if(user.interests.sort().join('').trim() === interestArray.sort().join('').trim()) return error(400, res, "There are no changes in your interests.")
		
		await userSetField(userId, { interests: interestArray })

		return success({}, 201, res)
	}, res)
}

export const updateName = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, name } = req.body
		const userId = getUserId(req)

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist.")

		if(name === user.name) return error(400, res, "There are no changes in name.")

		await Promise.all([
			userSetField(userId, { name }),
			postSetField(userId, { name })
		])

		return success({}, 201, res)
	}, res)
}

export const updatePassword = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, currentPassword, newPassword, confirmNewPassword } = req.body
		const userId = getUserId(req)

		if(!currentPassword || !newPassword || !confirmNewPassword) return error(400, res, "Error updating password. Try again later.")

		if(newPassword !== confirmNewPassword) return error(400, res, "New password and confirm new password should be the same.")

		if(newPassword === currentPassword) return error(400, res, "Current password and new password are the same.")
		
		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist.")

		const comparePassword = await bcrypt.compare(currentPassword, user.password as string)

		if(!comparePassword) return error(400, res, "Current password is wrong.")

		const salt = await bcrypt.genSalt(12)
		const hashedNewPassword = await bcrypt.hash(newPassword, salt)

		await userSetField(userId, { password: hashedNewPassword })

		return success({}, 201, res)
	}, res)
}

export const updateProfile = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, name, username } = req.body
		const userId = getUserId(req)

		const [user, existingUsername] = await Promise.all([
			User.findOne({ email }),
			User.findOne({ username })
		])

		if(!user) return error(401, res, "User does not exist.")

		if(existingUsername) return error(409, res, "Username is already existing.")

		await Promise.all([
			userSetField(userId, { name, username }),
			postSetField(userId, { name, username })
		])

		return success({
			name,
			username
		}, 201, res)
	}, res)
}

export const updatePhoto = async (req: Request, res: Response) => {
	/*
		this function, updatePhoto is either for profile picture or cover photo
	*/
	return catchError(async () => {
		const { email, changing, isCoverPhoto, prevPicture, picture } = req.body
		const userId = getUserId(req)
		const imagePath = path.join(__dirname, `../public/images/${picture}`)

		if(!email || !picture) {
			await fs.promises.unlink(imagePath)

			return error(400, res, "Error updating profile picture. Try again later.")
		}

		if(!isValidEmail(email)) {
			await fs.promises.unlink(imagePath)

			return error(400, res, errorEmail)
		}

		const user = await User.findOne({ email })

		if(!user) {
			await fs.promises.unlink(imagePath)

			return error(401, res, "User does not exist")
		}

		if(isCoverPhoto) {
			await userSetField(userId, { coverPhoto: picture })
		}
		else {
			await Promise.all([
				userSetField(userId, { picture }),
				postSetField(userId, { userPicture: picture })
			])
		}

		if(changing) {
			const newImagePath = path.join(__dirname, `../public/images/${prevPicture}`)
			await fs.promises.unlink(newImagePath)
		}

		return success({}, 201, res)
	}, res)
}

export const updateUsername = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, username } = req.body
		const userId = getUserId(req)

		const [user, existingUsername] = await Promise.all([
			User.findOne({ email }),
			User.findOne({ username })
		])

		if(!user) return error(401, res, "User does not exist")

		if(existingUsername) return error(409, res, "Username is already existing.")

		if(username === user.username) return error(400, res, "There are no changes in username.")

		await Promise.all([
			await userSetField(userId, { username }),
			await postSetField(userId, { username })
		])

		return success({
			username
		}, 201, res)
	}, res)
}

export const passwordConfirmation = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, password } = req.body

		if(!password) return error(400, res, "Error updating password. Try again later.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User not found.")

		const comparePassword = await bcrypt.compare(password, user.password as string)

		if(!comparePassword) return error(400, res, "Password is incorrect.")

		return success({}, 200, res)
	}, res)
}

export const removePicture = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, isCoverPhoto, picture } = req.body
		const userId = getUserId(req)
		const imagePath = path.join(__dirname, `../public/images/${picture}`)

		if(!picture) return error(400, res, "Error updating profile picture. Try again later.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		await fs.promises.unlink(imagePath)

		if(isCoverPhoto) {
			await userSetField(userId, { coverPhoto: '' })
		}
		else {
			await Promise.all([
				userSetField(userId, { picture: '' }),
				postSetField(userId, { userPicture: '' })
			])
		}

		return success({}, 201, res)
	}, res)
}

export const appendToRequestsSent = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { otherUserId } = req.body
		const currentUserId = getUserId(req)

		await userPushField(currentUserId, { requestsSent: otherUserId })

		return success({}, 200, res)
	}, res)
}

export const getUserWithSameInterests = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, interests } = req.params
		const interestsArr = interests.split('-')

		if(interestsArr.length < 1) return error(400, res, "Can not get users with the same interests.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "Unauthorized. Log in first to perform this action.")

		let otherUsers = await User.aggregate([
			{ $match: {
				email: { $ne: email },
				_id: { $nin: user.friends },
				interests: { $in: interestsArr }
			} },
			{ $sample: { size: 8 } },
			{ $project: { password: 0 } }
		])

		if(otherUsers.length < 1) {
			otherUsers = await User.aggregate([
				{ $match: {
					email: { $ne: email },
					_id: { $nin: user.friends },
				} },
				{ $sample: { size: 8 } },
				{ $project: { password: 0 } }
			])
		}

		if(otherUsers.length < 8) {
			let _otherUsers = await User.aggregate([
				{ $match: {
					email: { $ne: email },
					_id: { $nin: [...user.friends, ...otherUsers.map(otherUser => otherUser._id)] },
				} },
				{ $sample: { size: 8 - otherUsers.length } },
				{ $project: { password: 0 } }
			])

			otherUsers = otherUsers.concat(_otherUsers)
		}

		return success(otherUsers, 200, res)
	}, res)
}

export const acceptFriendRequest = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { userId, friendId } = req.body

		await Promise.all([
			userPushField(userId, { friends: friendId }),
			userPushField(friendId, { friends: userId })
		])

		return success({}, 201, res)
	}, res)
}

export const getUserFriends = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email } = req.params

		const userFriends = await User.findOne({ email })
			.populate('friends')
			.exec()

		if(!userFriends) return success({}, 200, res)

		return success(userFriends.friends, 200, res)
	}, res)
}

export const updateHasNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const userId = getUserId(req)

		await userSetField(userId, { hasNotification: false })

		return success({}, 200, res)
	}, res)
}
