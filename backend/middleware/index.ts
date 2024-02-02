import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { error, isValidEmail, isValidName, isValidUsername } from '../utils'

import User from '../models/user'
import { errorName, errorUsername } from '../utils/constants'

export const checkMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.token

		if(!token) return error(401, res)

		const checkToken = jwt.verify(token, process.env.KEY as string)

		if(!checkToken) return error(401, res)

		const jwtPayload = checkToken as JwtPayload

		const user = await User.findById({ _id: jwtPayload.id })

		if(!user) return error(401, res)

		next()
	}
	catch(e) {
		console.log(e)
		return error(500, res, "Internal Server Error")
	}
}

export const checkValidEmail = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body

	if(!email) return error(401, res, "Unauthorized. Log in first to perform this action.")

	if(!isValidEmail(email)) return error(400, res, "Enter a valid email.")

	next()
}

export const checkValidEmailParams = (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.params

	if(!email) return error(401, res, "Unauthorized. Log in first to perform this action.")

	if(!isValidEmail(email)) return error(400, res, "Enter a valid email.")

	next()
}

export const checkValidName = (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body

	if(!name) return error(400, res, "Invalid Request.")

	if(!isValidName(name)) return error(400, res, errorName)

	next()
}

export const checkValidUsername = (req: Request, res: Response, next: NextFunction) => {
	const { username } = req.body

	if(!username) return error(400, res, "Invalid Request.")

	if(!isValidUsername(username)) return error(400, res, errorUsername)

	next()
}
