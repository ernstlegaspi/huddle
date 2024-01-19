import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from "express"

export const success = (result: object, code: number, res: Response) => res.status(code).json(result)

export const error = (code: number, res: Response, message: string = "Invalid Request") => res.status(code).json({ message })

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
export const emailRegex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

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
