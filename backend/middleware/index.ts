import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { error } from '../utils'

import User from '../models/user'

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
