import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from "express"

import User from '../models/user'
import Post from '../models/post'

export const success = (result: object, code: number, res: Response) => res.status(code).json(result)

export const error = (code: number, res: Response, message: string = "") => res.status(code).json({ message })

export const catchError = async (callback: () => Promise<Response>, res: Response) => {
	try {
		return callback()
	}
	catch(e) {
		return error(500, res)
	}
}

export const getUserId = (req: Request) => {
	const token = req.cookies.token
	const payload = jwt.verify(token, process.env.KEY as string)
	const { id } = payload as JwtPayload

	return id
}

export const isValidBirthday = (birthday: string) => {
	const birthdayRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/

	return birthdayRegex.test(birthday)
}

export const isValidEmail = (email: string) => {
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
	const emailRegex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

	return emailRegex.test(email) || emailRegex2.test(email)
}

export const isValidName = (name: string) => {
	const nameRegEx = /^[a-zA-Z\s]+$/

	return nameRegEx.test(name)
}

export const isValidUsername = (username: string) => {
	const usernameRegEx = /^[a-zA-Z_]+$/

	return usernameRegEx.test(username)
}

export const updateUser = async (userId: string, data: object) => {
	await User.findByIdAndUpdate(userId,
		{ $set: data },
		{ new: true }
	)
}

export const updatePosts = async (ownerId: string, data: object) => {
	await Post.updateMany({ owner: ownerId },
		{ $set: data }
	)
}
