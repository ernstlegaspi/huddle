import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import Post from '../models/post'
import User from '../models/user'
import { catchError, error, getUserId, isValidBirthday, isValidEmail, isValidName, isValidUsername, success, updateUser } from '../utils/index'
import { signInSchema, signUpSchema } from '../utils/schema'
import { errorEmail, errorName, errorUsername } from '../utils/constants'

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

		const user = await User.findOne({ email }).select('-password')

		if(!user) return error(404, res)

		return success(user, 200, res)
	}, res)
}

export const updateProfile = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, name, username } = req.body
		const userId = getUserId(req)

		if(!email || !name || !username) return error(400, res, "Error updating profile. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		if(!isValidName(name)) return error(400, res, errorName)

		if(!isValidUsername(username)) return error(400, res, errorUsername)
		
		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist.")

		await updateUser(userId, { name, username })

		await Post.updateMany({ owner: userId },
			{ $set: {
				name,
				username
			} }
		)

		return success({
			name,
			username
		}, 201, res)
	}, res)
}

export const updateName = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, name } = req.body
		const userId = getUserId(req)

		if(!email || !name) return error(400, res, "Error updating name. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		if(!isValidName(name)) return error(400, res, errorName)

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		if(name === user.name) return error(400, res, "There are no changes in name.")

		await updateUser(userId, { name })

		await Post.updateMany({ owner: userId },
			{ $set: {
				name
			} }
		)

		return success({}, 201, res)
	}, res)
}

export const updateUsername = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, username } = req.body
		const userId = getUserId(req)

		if(!email || !username) return error(400, res, "Error updating username. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		if(!isValidUsername(username)) return error(400, res, errorUsername)
		
		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		if(username === user.username) return error(400, res, "There are no changes in username.")

		await updateUser(userId, { username })

		await Post.updateMany({ owner: userId },
			{ $set: {
				username
			} }
		)

		return success({
			username
		}, 201, res)
	}, res)
}

export const updateEmail = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email } = req.body
		const userId = getUserId(req)

		if(!email) return error(400, res, "Error updating email. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		const user = await User.findOne({ email })

		if(user) return error(401, res, "Email is already used.")

		await updateUser(userId, { email })

		return success({
			email
		}, 201, res)
	}, res)
}

export const updatePassword = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, password } = req.body
		const userId = getUserId(req)

		if(!email || !password) return error(400, res, "Error updating password. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User not found.")

		await updateUser(userId, { password })

		return success({}, 201, res)
	}, res)
}

export const updateBirthday = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { birthday, email } = req.body
		const userId = getUserId(req)

		if(!email || !birthday) return error(400, res, "Error updating birthday. Try again later.")

		if(!isValidEmail(email)) return error(400, res, errorEmail)

		if(!isValidBirthday(birthday)) return error(400, res, "Enter a valid birthday.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		await updateUser(userId, { birthday })

		return success({ birthday }, 201, res)
	}, res)
}
