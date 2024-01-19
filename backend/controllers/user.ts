import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import User from '../models/user'
import { catchError, emailRegex, emailRegex2, error } from '../utils/index'
import { signInSchema, signUpSchema } from '../utils/schema'

const COOKIE_AGE = 9999999999999

export const signIn = (req: Request, res: Response) => {
	return catchError(async () => {
		const { error: joiError, value } = signInSchema.validate(req.body)
		const { email, password } = value

		if(joiError || !emailRegex2.test(email) || !emailRegex2.test(email)) return error(400, res)

		const user = await User.findOne({ email })

		if(!user) return error(404, res, "User does not exist.")

		const comparePassword = await bcrypt.compare(password, user.password as string)

		if(!comparePassword) return error(401, res, "User does not exist.")

		delete (user as any)?.password

		const token = jwt.sign({
			id: user._id,
			email: user.email
		}, process.env.KEY as string, { expiresIn: '3h' })

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
			username: user?.username
		})
	}, res)
}

export const signUp = (req: Request, res: Response) => {
	return catchError(async () => {
		const { error: joiError, value } = signUpSchema.validate(req.body)
		const { email, password, interests: interestsData } = value
		const interests: string[] = interestsData as string[]

		if(interests.length < 1 || joiError || !emailRegex.test(email) || !emailRegex2.test(email)) return error(400, res)

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const existingUser = await User.findOne({ email })

		if(existingUser) return error(409, res)

		const newUser = await new User({
			...req.body,
			password: hashedPassword
		}).save()

		delete (newUser as any)?.password

		const token = jwt.sign({
			id: newUser._id,
			email: newUser.email
		}, process.env.KEY as string, { expiresIn: '3h' })

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
			picture: newUser?.picture,
			username: newUser?.username
		})
	}, res)
}

export const signOut = (req: Request, res: Response) => {
	return catchError(async () => {
		return res.status(200).clearCookie('token').json({})
	}, res)
}
