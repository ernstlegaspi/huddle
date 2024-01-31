import bcrypt from 'bcrypt'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { Request, Response } from 'express'

import Post from '../models/post'
import User from '../models/user'
import { catchError, error, getUserId, isValidBirthday, isValidEmail, isValidName, isValidUsername, success, updatePosts, updateUser } from '../utils/index'
import { signInSchema, signUpSchema } from '../utils/schema'
import { errorEmail, errorName, errorUnauthorized, errorUsername } from '../utils/constants'

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
		const { email, name, password, interests: interestsData } = value
		const interests: string[] = interestsData as string[]

		if(interests.length < 1 || joiError) return error(400, res, 'Error signing up. Try again later.')

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		if(!isValidName(name)) return error(400, res, errorName)

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const existingUser = await User.findOne({ email })

		if(existingUser) return error(409, res, "Email is already existing")

		const newUser = await new User({
			...req.body,
			password: hashedPassword
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
		
		await updateUser(userId, { birthday })

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

		await updateUser(userId, { email: newEmail })

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
		
		await updateUser(userId, { interests: interestArray })

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

		await updateUser(userId, { name })

		await updatePosts(userId, { name })

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

		await updateUser(userId, { password: hashedNewPassword })

		return success({}, 201, res)
	}, res)
}

export const updateProfile = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, name, username } = req.body
		const userId = getUserId(req)

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist.")
		
		await updateUser(userId, { name, username })

		await updatePosts(userId, { name, username })

		return success({
			name,
			username
		}, 201, res)
	}, res)
}

export const updateProfilePicture = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, changing, prevProfilePicture, picture } = req.body
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

		await updateUser(userId, { picture })

		await updatePosts(userId, { userPicture: picture })

		if(changing) {
			const newImagePath = path.join(__dirname, `../public/images/${prevProfilePicture}`)
			await fs.promises.unlink(newImagePath)
		}

		return success({}, 201, res)
	}, res)
}

export const updateUsername = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, username } = req.body
		const userId = getUserId(req)

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		if(username === user.username) return error(400, res, "There are no changes in username.")

		await updateUser(userId, { username })

		await updatePosts(userId, { username })

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

export const removeProfilePicture = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, picture } = req.body
		const userId = getUserId(req)
		const imagePath = path.join(__dirname, `../public/images/${picture}`)

		if(!picture) return error(400, res, "Error updating profile picture. Try again later.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		await fs.promises.unlink(imagePath)

		await updateUser(userId, { picture: '' })

		await updatePosts(userId, { userPicture: '' })

		return success({}, 201, res)
	}, res)
}
