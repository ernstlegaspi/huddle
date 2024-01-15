import { Request, Response } from "express"

export const success = (result: object, code: number, res: Response) => res.status(code).json(result)

export const error = (code: number, res: Response) => res.status(code).json({ message: `Error: ${code}` })

export const catchError = async (callback: () => Promise<Response>, res: Response) => {
	try {
		return callback()
	}
	catch(e) {
		return error(500, res)
	}
}
