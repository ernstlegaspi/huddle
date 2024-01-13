import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import User from '../models/user'
import { addCookie, catchError, error, success } from '../utils/index'
import { signInSchema, signUpSchema } from '../utils/schema'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
const emailRegex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const KEY: string = process.env.KEY as string

export const signIn = (req: Request, res: Response) => {
	return catchError(async () => {
		const { error: joiError, value } = signInSchema.validate(req.body)
		const { email, password } = value

		if(joiError || !emailRegex.test(email) || !emailRegex2.test(email)) return error(400, res)

		const user = await User.findOne({ email })

		if(!user) return error(404, res)

		const comparePassword = await bcrypt.compare(password, user.password as string)

		if(!comparePassword) return error(401, res)

		delete (user as any)?.password

		const token = jwt.sign({
			id: user._id,
			email: user.email
		}, KEY, { expiresIn: '3h' })

		addCookie(req, res, token)

		return success({
			email: user?.email,
			name: user?.name,
			username: user?.username
		}, 201, res)
	}, res)
}

export const signUp = (req: Request, res: Response) => {
	return catchError(async () => {
		const { error: joiError, value } = signUpSchema.validate(req.body)
		const { email, name, password, interests: interestsData } = value
		const interests: string[] = interestsData as string[]

		if(interests.length < 0 || joiError || !emailRegex.test(email) || !emailRegex2.test(email)) return error(400, res)

		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const existingUser = await User.findOne({ email })

		if(existingUser) return error(409, res)

		const newUser = await new User({
			...req.body,
			username: `@${name.replace(" ", "")}`,
			password: hashedPassword
		}).save()

		delete (newUser as any)?.password

		const token = jwt.sign({
			id: newUser._id,
			email: newUser.email
		}, KEY, { expiresIn: '3h' })

		addCookie(req, res, token)

		return success({
			email: newUser?.email,
			name: newUser?.name,
			username: newUser?.username
		}, 201, res)
	}, res)
}
